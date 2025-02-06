import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  userName: string;
  address: string;
}

const Header: React.FC<HeaderProps> = ({ userName, address }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <button className={styles.backButton} onClick={handleBack}>
          <Image
            src="/logo2.png" // Caminho da logo
            alt="Logo da plataforma"
            width={100} // Largura da logo
            height={40} // Altura da logo
            className={styles.logo}
          />
        </button>

        {/* Informações do usuário */}
        <div className={styles.userInfo}>
          <h1 className={styles.title}>
            Olá {userName}, você está neste endereço?
          </h1>
          <p className={styles.address}>{address}</p>
        </div>
      </div>
      {/* Botão de voltar com a logo */}

      {/* Divider */}
      <div className={styles.divider}></div>
    </div>
  );
};

export default Header;
