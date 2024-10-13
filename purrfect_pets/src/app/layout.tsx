import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Petshop',
    description: 'Gerenciamento de Pets e Serviços',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body>{children}</body>
        </html>
    );
}
