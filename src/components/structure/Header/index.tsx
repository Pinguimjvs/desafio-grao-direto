import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Header.module.css";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  userName: string;
  address: string;
}

const Header: React.FC<HeaderProps> = ({ userName, address }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleBack = () => {
    router.push("/");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <button className={styles.backButton} onClick={handleBack}>
          <Image
            src="/logo2.png"
            alt="Logo da plataforma"
            width={100}
            height={40}
            className={styles.logo}
          />
        </button>

        <div className={styles.userInfo}>
          <h1 className={styles.title}>
            Olá {userName}, você está neste endereço?
          </h1>
          <p className={styles.address}>{address}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      <div className={styles.divider}></div>
    </div>
  );
};

export default Header;
