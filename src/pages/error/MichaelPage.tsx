import React from "react";
import EffectChart from "../../components/report/EffectChart";

export const MichaelPage: React.FC = () => {


    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#fff"
        }}>
            <EffectChart/>
        </div>
    )
}