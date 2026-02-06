import "./globals.css";

export const metadata = {
  title: "CICtards | Insert Coin",
  description: "Level up with the CICtards 8-bit Portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased bg-black text-white selection:bg-green-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
