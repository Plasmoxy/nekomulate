import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import './globals.css';

const font = Source_Code_Pro({
    weight: 'variable',
    subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
    title: 'Nekomulate',
    description: 'by Plasmoxy',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${font.className} font-light`} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
