"use client";
import { ThemeContextProvider } from "../common/MuiThemeProvider";
import Header from "../components/header";
import AddNotes from "../components/addNotesButton";
import ToastProvider from "../components/ToastProvider";
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
          <ToastProvider>{children}</ToastProvider>
          <AddNotes />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
