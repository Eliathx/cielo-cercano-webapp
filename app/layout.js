import "./globals.css";
import Header from "./components/Header/Header";
import { NeoDataProvider } from "./context/NeoDataContext";
import { FilterSettingsProvider } from "./context/FilterSettingsContext";

export const metadata = {
  title: "Cielo Cercano",
  description: "Explora el espacio cercano y conoce los objetos cercanos a la Tierra.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Header/>
          <FilterSettingsProvider>
          <NeoDataProvider>
                {children}
          </NeoDataProvider>
          </FilterSettingsProvider>

      </body>
    </html>
  );
}
