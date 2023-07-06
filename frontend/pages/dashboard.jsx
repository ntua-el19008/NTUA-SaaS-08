import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { authFetch } from "lib/generalUtils";

export default function IndexPage() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        authFetch(
            `${process.env.NEXT_PUBLIC_GET_USER_INFO_URL?.replace(
                ":userId",
                session?.userId || "12345"
            )}`
        )
            .then((response) => {
                if (response.status != 404) {
                    return response.json();
                }
            })
            .then((body) => setUserData(body));
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    padding: "2rem",
                    borderRadius: "1rem",
                    textAlign: "center",
                    width: "80%",
                    maxWidth: "400px",
                }}
            >
                <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
                    {userData && `Total Charts: ${userData?.totalCharts || "<error>"}`}
                    <br />
                    {userData && `Total Tokens: ${userData?.totalTokens || "<error>"}`}
                    <br />
                    {userData && `Last Sign In: ${userData?.lastSignIn || "<error>"}`}
                </p>
            </div>
        </div>
    );
}
