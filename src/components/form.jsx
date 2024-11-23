import { useState } from "react";
import { Button } from "./ui/button";
import Swal from "sweetalert2";

export default function Form({ isOpen, onClose }) {
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [files, setFiles] = useState(null);

  const [fileBase64, setFileBase64] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file selected
    if (file) {
      setFileName(file.name); // Store the file name
      const reader = new FileReader();

      reader.onload = () => {
        // The file has been successfully read, and we get the base64 string
        setFileBase64(reader.result); // Set base64 data to state
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      first_name: firstName,
      second_name: secondName,
      description: description,
      image_url: fileBase64,
    };

    fetch("http://localhost:3000/v1/api/add-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Submission Successful",
            text: "Your data has been submitted!",
          }).then(() => {
            window.location.reload();
          });
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        }).then(() => {
          console.log();
          window.location.reload();
        });
      });
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center fixed top-0 right-0 left-0 z-50 md:inset-0 h-[calc(100%-1rem)]">
            <Button onClick={() => onClose(false)}>close</Button>
            <div className="w-full max-w-2xl bg-blue rounded-lg shadow-sm p-8">
              <h1 className="text-2xl font-semibold text-center text-white mb-8">
                Upload Your Photos
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">First Name</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full text-white  px-3 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="mt-1 text-xs text-white">First Name</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        className="w-full px-3 text-white  bg-transparent py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="mt-1 text-xs text-white">Last Name</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 50))}
                    className="w-full text-white bg-transparent px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    required
                  />
                  <p className="text-xs text-gray-500 text-right">{description.length}/50</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Upload Photos</label>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-100">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        {fileBase64 && (
                          <div>
                            <h3 className="text-white">{fileName}</h3>
                          </div>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></> // Placeholder if isOpen is false
      )}
    </>
  );
}
