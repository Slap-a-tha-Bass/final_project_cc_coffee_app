import React from 'react';

const RootLayout = ({children}: IRootLayoutProps) => {
    return (
        <main className="container">
            <section className="row justify-content-center">
                <div className="col-md-6">
                    {children}
                </div>
            </section>
        </main>
    )
}
interface IRootLayoutProps {
    children: React.ReactNode
}
export default RootLayout;
