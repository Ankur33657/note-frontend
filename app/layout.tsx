"use client";
import { ThemeContextProvider } from "../common/MuiThemeProvider";
import Header from "../components/header";
import AddNotesButton from "../components/addNotesButton";
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
          <AddNotesButton />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
