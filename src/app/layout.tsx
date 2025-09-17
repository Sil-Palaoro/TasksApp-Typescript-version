/*Layout de la App con metadata, head (favicon, fuentes), y ubicación de los componentes de la 
Barra de Navegación y Footer */
import { ReactNode } from "react";
import BarraNavAppTareas from "@/app/components/BarraNavAppTareas";
import Footer from "@/app/components/Footer";
import { Metadata } from "next";
import { Alegreya, Josefin_Slab, Lato, Merriweather, Poppins } from "next/font/google";


export const metadata: Metadata = {
  title: "SGP Tareas",
  description: "Tu organizador personal",
  icons: {
    icon: "/check-icon.png"    
  }
};

interface RootLayoutProps {
  children: ReactNode;
};


//Fuentes
const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["italic"],
});

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  weight: ["500"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});


export default function RootLayout({ children }: RootLayoutProps ) {
  return (
    <>      
      <html lang="es">
        <body className={`${alegreya.className} ${josefinSlab.className} ${lato.className} ${merriweather.className} ${poppins.className} bg-gray-100 text-gray-800 font-sans`}>
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
