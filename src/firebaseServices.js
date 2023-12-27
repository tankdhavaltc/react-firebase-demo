import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Firestore service methods
export const firestoreService = {
    snapshotDocuments(collectionName, callback) {
        const query = collection(db, collectionName);
        const unsubscribe = onSnapshot(query, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                    const docData = { uid: doc.id, ...doc.data() };
                    documents.push(docData);
                }
            });
            callback(documents);
        });

        return unsubscribe; // Return the unsubscribe function to stop listening when needed
    },
    snapshotDocument(collectionName, _query, callback) {
        const q = query(collection(db, collectionName), where(_query?.field, _query?.operator, _query?.value))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                    const docData = { uid: doc.id, ...doc.data() };
                    documents.push(docData);
                }
            });
            callback(documents);
        });
        return unsubscribe; // Return the unsubscribe function to stop listening when needed
    },
};

