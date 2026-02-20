import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const useUserRole = (userEmail) => {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!userEmail) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                console.log("🔍 Fetching role for:", userEmail);
                const userDocRef = doc(db, "users", userEmail);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("✅ User data found:", userData);
                    setRole(userData.role || "");
                } else {
                    console.log("❌ No user document found for:", userEmail);
                    setRole("");
                }
            } catch (err) {
                console.error("❌ Error fetching user role:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [userEmail]);

    return { role, loading, error };
};

export default useUserRole;