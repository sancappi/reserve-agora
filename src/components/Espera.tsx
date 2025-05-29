import React from "react";

const Espera: React.FC = () => {
    return (
        <>
            <nav className="fixed inset-0 flex  z-50 justify-center items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent 
                    rounded-full animate-spin">
                </div>
            </nav>
        </>
    );
};

export default Espera;