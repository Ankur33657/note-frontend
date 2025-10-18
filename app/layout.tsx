"use client";
import { ThemeContextProvider } from "../common/MuiThemeProvider";
import Header from "../components/header";
import AddNotes from "../components/addNotes";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <Header />
          {children}
          <AddNotes />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
