import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Login.module.css";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { createHmac } from "crypto";

// Configuração do User Pool
const poolData = {
  UserPoolId: "us-east-1_zC8As2I7i", // Substitua pelo seu User Pool ID
  ClientId: "433h4kjc2qh88hjmfvaaa2qbkq", // Substitua pelo seu Client ID
};

const userPool = new CognitoUserPool(poolData);

// Função para calcular o SECRET_HASH
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
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Configuração do usuário
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    // Calcular o SECRET_HASH
    const clientSecret = "17md3mq5adem1bitkgo86k68vv217qbmmo8hbmtnf8lfpa7139eu"; // Substitua pelo seu Client Secret
    const secretHash = calculateSecretHash(
      email,
      poolData.ClientId,
      clientSecret
    );

    // Detalhes de autenticação com SECRET_HASH
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
      ClientMetadata: {
        // Adicionar SECRET_HASH aqui
        SECRET_HASH: secretHash,
      },
    });

    // Autenticação
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log("Login bem-sucedido:", session);
        setError("");
        router.push("/");
      },
      onFailure: (err) => {
        console.error("Erro no login:", err);
        setError("Usuário ou senha incorretos");
      },
    });
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
