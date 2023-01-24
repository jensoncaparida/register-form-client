import styles from "@/styles/Header.module.scss";
import { Poppins } from "@next/font/google";
import Image from "next/image";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Header() {
  return (
    <div className={`${poppins.className} ${styles.main}`}>
      <div>
        <Image
          src="logo.svg"
          alt="logo"
          width={50}
          height={50}
          priority
        ></Image>
      </div>
      <div className={styles.title}>
        <p>Technological University of the Philippines</p>
      </div>
    </div>
  );
}
