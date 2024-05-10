import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import mime from "mime";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadPath = path.join(__dirname, "uploads");

fs.ensureDir(uploadPath)
  .then(() => {
    console.log("Upload directory created:", uploadPath);
  })
  .catch((err) => {
    console.error("Error creating upload directory:", err);
  });

export const uploadFile = async (req, res) => {
    try {
      req.pipe(req.busboy); // Pipe it through busboy
  
      req.busboy.on("file", (fieldname, file, filename) => {
        console.log(`Upload of '${filename.filename}' started`);
  
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(
          path.join(uploadPath, filename.filename)
        );
        // Pipe it through
        file.pipe(fstream);
  
        // On finish of the upload
        fstream.on("close", () => {
          console.log(`Upload of '${filename.filename}' finished`);
          res.send("Upload successful");
        });
      });
    } catch (error) {
      console.error("Error occurred during upload:", error);
      res.status(500).json({ message: "An error occurred during upload" });
    }
};

export const downloadFile = async (req, res) => {
    try {
        const filename = req.params.filename; // Access the filename from the request parameters
        const decodedFileName = decodeURIComponent(filename).replace(/\*/g, " ");
        const filePath = path.join(uploadPath, decodedFileName); // Use path.join to construct file path
    
        if (fs.existsSync(filePath)) {
          // Set content type based on file extension
          const contentType = mime.getType(filePath) || "application/octet-stream";
          res.setHeader("Content-Type", contentType);
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="${decodedFileName}"`
          );
    
          // Send the file as a response
          const fileStream = fs.createReadStream(filePath);
          fileStream.pipe(res);
        } else {
          // If the file doesn't exist, send a 404 status code
          res.status(404).send("File not found");
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
};
  