import "../styles/index.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
