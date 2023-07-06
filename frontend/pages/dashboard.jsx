import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { authFetch } from "lib/generalUtils";

export default function IndexPage() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        authFetch(
            session,
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
            .then((body) => {
                console.log(body);
                setUserData(body);
            });
    }, [session]);

    if (status === "loading") return <div>Loading...</div>;

    console.log(process.env.NEXT_PUBLIC_CHART_UPLOAD_URL);
    console.log(process.env.NEXT_PUBLIC_CHART_FETCH_URL);
    console.log(process.env.NEXT_PUBLIC_USER_CREATION_URL);
    console.log(process.env.NEXT_PUBLIC_UPDATE_LAST_LOGIN_URL);
    console.log(process.env.NEXT_PUBLIC_ADD_TOKENS_URL);
    console.log(process.env.NEXT_PUBLIC_GET_USER_INFO_URL);
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
