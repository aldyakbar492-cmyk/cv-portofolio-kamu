import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";
import "./Submissions.css";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "submissions")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSubmissions(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    getSubmissions();
  }, []);

  // Fungsi untuk menghapus data
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data ini?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(
        doc(db, "submissions", id)
      );

      setSubmissions((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error(
        "Gagal menghapus data:",
        error
      );

      alert("Gagal menghapus data!");
    }
  };

  // Tombol Lihat dan Download
  const FileActions = ({ file, label }) => {
    if (!file?.url) {
      return null;
    }

    const downloadUrl = file.url.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );

    return (
      <div className="file-item">
        <div className="file-info">
          <span className="file-label">
            {label}
          </span>

          <small>
            {file.namaFile}
          </small>
        </div>

        <div className="file-actions">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="file-button view-button"
          >
            Lihat
          </a>

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="file-button download-button"
          >
            Download
          </a>
        </div>
      </div>
    );
  };

  return (
    <main className="submissions-page">
      <div className="submissions-container">

        {/* HEADER */}
        <div className="submissions-header">
          <h1>
            Data Pengumpulan
          </h1>

          <p>
            Daftar CV dan portofolio yang
            telah dikumpulkan.
          </p>

          <button
            className="back-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Kembali ke Form
          </button>
        </div>

        {/* LIST DATA */}
        <div className="submission-list">

          {submissions.length === 0 ? (
            <p className="empty-message">
              Belum ada data pengumpulan.
            </p>
          ) : (
            submissions.map((item) => (
              <div
                className="submission-card"
                key={item.id}
              >

                {/* INFORMASI USER */}
                <div className="submission-info">
                  <h2>
                    {item.nama}
                  </h2>

                  <p>
                    Dokumen yang dikumpulkan
                  </p>
                </div>

                {/* FILE */}
                <div className="file-list">

                  <FileActions
                    file={item.cv}
                    label="CV"
                  />

                  <FileActions
                    file={item.portfolio}
                    label="Portofolio"
                  />

                  <FileActions
                    file={item.karyaLainnya}
                    label="Karya Lainnya"
                  />

                </div>

                {/* HAPUS DATA */}
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                >
                  Hapus Data
                </button>

              </div>
            ))
          )}

        </div>
      </div>
    </main>
  );
}

export default Submissions;

