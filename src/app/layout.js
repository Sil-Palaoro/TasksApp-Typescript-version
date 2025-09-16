/*Layout de la App con metadata, head (favicon, fuentes), y ubicación de los componentes de la 
Barra de Navegación y Footer */

import BarraNavAppTareas from "@/app/components/BarraNavAppTareas";
import Footer from "@/app/components/Footer";
import Head from "next/head";


export const metadata = {
  title: "SGP Tareas",
  description: "Tu organizador personal",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/check-icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@1,600;1,700&family=Josefin+Slab:wght@500&family=Lato:wght@700&family=Merriweather:wght@300&family=Poppins:ital,wght@1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <html lang="es">
        <body className="bg-gray-100 text-gray-800 font-sans">
          <div className="container mx-auto px-4">
            <BarraNavAppTareas />
            <main>{children}</main>
            <Footer /> 
          </div>
        </body>
      </html>         
    </>
  );
}
