import "./globals.css";
export const metadata = {
  title: "HR Suite",
  description: "HR compliance, simplified",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

