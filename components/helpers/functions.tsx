import { toast } from "react-hot-toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import {
  query,
  where,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import { Notification } from "@/types";
export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);
    return toast.promise(
      func()
        .then((res) => {
          const data = res?.data;
          if (data && data.success === false) {
            throw new Error(data.message);
          }
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          setLoading(false);
          if (efunc) efunc();
          throw new Error(e);
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          console.log(e);
          return e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};

export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url: string) => {
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
export function findItemIdByName<T extends { _id: string; name: string }>(
  name: string,
  items: T[]
): string | undefined {
  const foundItem = items.find((item) => item.name === name);

  if (foundItem) {
    return foundItem._id;
  }
  return undefined;
}
export function findItemNameById<T extends { _id: string; name: string }>(
  id: string,
  items: T[]
): string | undefined {
  const foundItem = items.find((item) => item._id === id);
  return foundItem?.name || "";
}

// export const useNotifications = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   useEffect(() => {
//     const q = query(
//       collection(db, "notifications"),
//       where("read", "==", false)
//     );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const updatedNotifications = snapshot.docs.map(
//         (doc) =>
//           ({
//             id: doc.id,
//             ...doc.data(),
//           } as Notification)
//       );
//       setNotifications(updatedNotifications);
//     });
//     return () => unsubscribe();
//   }, []);
//   return { notifications };
// };
