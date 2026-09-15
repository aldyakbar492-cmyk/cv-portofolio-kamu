import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { uploadToCloudinary } from "../clodinary";
import "./Home.css";

function Home() {
  const [nama, setNama] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [cv, setCv] = useState("");
  const [karyaLainnya, setKaryaLainnya] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateFile = (file, allowedTypes, maxSize) => {
      if (!file) {
        return false;
      }

      if (!allowedTypes.includes(file.type)) {
        return false;
      }

      if (file.size > maxSize) {
        return false;
      }

      return true;
    };

    if (!nama) {
      alert("Nama wajib diisi!");
      return;
    }

    if (!portfolio) {
      alert("Portofolio wajib diupload!");
      return;
    }

    if (!cv) {
      alert("CV wajib diupload!");
      return;
    }

    if (
      !validateFile(
        portfolio,
        ["application/pdf", "application/zip", "application/x-zip-compressed"],
        10 * 1024 * 1024
      )
    ) {
      alert("Portofolio harus PDF/ZIP dan maksimal 10 MB!");
      return;
    }

    if (
      !validateFile(
        cv,
        ["application/pdf"],
        5 * 1024 * 1024
      )
    ) {
      alert("CV harus PDF dan maksimal 5 MB!");
      return;
    }

    if (
      karyaLainnya &&
      !validateFile(
        karyaLainnya,
        [
          "application/pdf",
          "application/zip",
          "application/x-zip-compressed",
          "image/jpeg",
          "image/png",
        ],
        10 * 1024 * 1024
      )
    ) {
      alert("Karya Lainnya memiliki format atau ukuran yang tidak sesuai!");
      return;
    }

    try {
      const portfolioData = await uploadToCloudinary(portfolio);
      const cvData = await uploadToCloudinary(cv);

      let karyaLainnyaData = null;

      if (karyaLainnya) {
        karyaLainnyaData = await uploadToCloudinary(karyaLainnya);
      }

      await addDoc(collection(db, "submissions"), {
        nama: nama,

        portfolio: {
          namaFile: portfolio.name,
          url: portfolioData.secure_url,
          publicId: portfolioData.public_id,
        },

        cv: {
          namaFile: cv.name,
          url: cvData.secure_url,
          publicId: cvData.public_id,
        },

        karyaLainnya: karyaLainnyaData
          ? {
            namaFile: karyaLainnya.name,
            url: karyaLainnyaData.secure_url,
            publicId: karyaLainnyaData.public_id,
          }
          : null,
      });

      alert("Data berhasil disimpan!");

      setNama("");
      setPortfolio("");
      setCv("");
      setKaryaLainnya("");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan data!");
    }
  };

  return (
    <main className="home">
      <div className="form-container">

        <div className="form-header">
          <h1>Pengumpulan CV & Portofolio</h1>

          <p>
            Kirim CV dan portofolio kamu melalui form di bawah ini.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Nama */}
          <div className="form-group">
            <label htmlFor="nama">
              Nama
            </label>

            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama"
            />
          </div>

          {/* Portofolio */}
          <div className="form-group">
            <label htmlFor="portfolio">
              Portofolio
            </label>

            <div className="file-box">

              <input
                id="portfolio"
                type="file"
                accept=".pdf,.zip"
                onChange={(e) =>
                  setPortfolio(e.target.files[0])
                }
              />

              {portfolio && (
                <small>
                  File: {portfolio.name}
                </small>
              )}

              <p>
                Upload file portofolio kamu
              </p>

              <small>
                Format: PDF atau ZIP
              </small>

            </div>
          </div>

          {/* CV */}
          <div className="form-group">
            <label htmlFor="cv">
              CV
            </label>

            <div className="file-box">

              <input
                id="cv"
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setCv(e.target.files[0])
                }
              />

              {cv && (
                <small>
                  File: {cv.name}
                </small>
              )}

              <p>
                Upload CV kamu
              </p>

              <small>
                Format yang diperbolehkan: PDF
              </small>

            </div>
          </div>

          {/* Karya Lainnya */}
          <div className="form-group">

            <label htmlFor="karyaLainnya">
              Karya Lainnya{" "}
              <span>(Opsional)</span>
            </label>

            <div className="file-box">

              <input
                id="karyaLainnya"
                type="file"
                accept=".pdf,.zip,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setKaryaLainnya(e.target.files[0])
                }
              />

              {karyaLainnya && (
                <small>
                  File: {karyaLainnya.name}
                </small>
              )}

              <p>
                Upload karya lainnya
              </p>

              <small>
                Format: PDF, ZIP, JPG, JPEG, PNG
              </small>

            </div>
          </div>



          <div className="button-group">
            <button type="submit" className="btn-primary">
              Kirim Pengumpulan
            </button>

           
          </div>



        </form>
      </div>
    </main>
  );
}

export default Home;