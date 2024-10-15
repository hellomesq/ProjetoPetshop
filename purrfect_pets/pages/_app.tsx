import React from "react";
import { AppProps } from "next/app";
import '../styles/components.css';
import '../styles/dashboard.css';
import '../styles/index.css';

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
    return <Component {...pageProps} />;

};

export default MyApp;