import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Login.module.css";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from "crypto";
import { useAuth } from "@/hooks/useAuth";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
};
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const calculateSecretHash = (
  username: string,
  clientId: string,
  clientSecret: string
): string => {
  return createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET;
    const secretHash = calculateSecretHash(
      email,
      poolData.ClientId,
      clientSecret
    );

    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: poolData.ClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    try {
      const response = await client.send(command);
      console.log("Login bem-sucedido:", response);
      setError("");

      const token = response.AuthenticationResult?.IdToken;
      if (token) {
        login(token);
      }
    } catch (err: any) {
      console.log("Erro no login:", err);
      if (err.name === "NotAuthorizedException") {
        setError("Usuário ou senha incorretos");
      } else {
        setError("Ocorreu um erro durante o login. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundWrapper}>
        <Image
          src="/login-background.webp"
          alt="Login Background"
          fill
          quality={100}
          priority
        />
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2>Acesse seus restaurantes preferidos</h2>
        <input
          className={styles.input}
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
