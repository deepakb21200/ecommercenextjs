import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
 

export default function CustomerLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
       <Footer/>
    </>
  );
}