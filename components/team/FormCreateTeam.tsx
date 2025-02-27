  "use client";
  import { useState } from "react";
  import { CreateTeamData } from "@/types/form";
  import Image from "next/image";
  import { Upload } from "lucide-react";
  import { useRouter } from "next/navigation";
  import createTeamApi from "@/service/createTeamApi"; 
  import { getToken } from "@/utils/getToken";

  const CreateTeam = () => {
    const [formData, setFormData] = useState<CreateTeamData>({
      cover: null,
      logo: null,
      name: "",
      address: "",
      intro: "",
      sport: "",
      userId: 1, // ID user lấy từ context hoặc state
    });
    const token = getToken();
    console.log(token)
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const router = useRouter();

    // Xử lý thay đổi input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    // Xử lý upload ảnh
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "cover" | "logo") => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (type === "cover") {
          setFormData({ ...formData, cover: file });
          setCoverPreview(URL.createObjectURL(file));
        } else {
          setFormData({ ...formData, logo: file });
          setLogoPreview(URL.createObjectURL(file));
        }
      }
    };

    // Xóa ảnh đã upload
    const handleRemoveImage = (type: "cover" | "logo") => {
      if (type === "cover") {
        setFormData({ ...formData, cover: null });
        setCoverPreview(null);
      } else {
        setFormData({ ...formData, logo: null });
        setLogoPreview(null);
      }
    };

    // Xử lý submit form
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!token) {
        console.error("Token không tồn tại. Vui lòng đăng nhập lại.");
        return;
      }
    
      try {
        let coverUrl = "";
        let logoUrl = "";
    
        // Nếu có ảnh cover, upload lên Cloudinary
        if (formData.cover) {
          const coverFormData = new FormData();
          coverFormData.append("file", formData.cover);
          coverFormData.append("upload_preset", "rymvqqtd");
          coverFormData.append("folder", "NextJs");
    
          const coverRes = await fetch("https://api.cloudinary.com/v1_1/dyfs9b4uj/image/upload", {
            method: "POST",
            body: coverFormData,
          });
          const coverData = await coverRes.json();
          coverUrl = coverData.secure_url; // Lấy URL của ảnh từ Cloudinary
        }
    
        // Nếu có ảnh logo, upload lên Cloudinary
        if (formData.logo) {
          const logoFormData = new FormData();
          logoFormData.append("file", formData.logo);
          logoFormData.append("upload_preset", "rymvqqtd");
          logoFormData.append("folder", "NextJs");
    
          const logoRes = await fetch("https://api.cloudinary.com/v1_1/dyfs9b4uj/image/upload", {
            method: "POST",
            body: logoFormData,
          });
          const logoData = await logoRes.json();
          logoUrl = logoData.secure_url;
        }
    
        // Sau khi có URL ảnh, gửi lên API
        const requestData = {
          name: formData.name,
          address: formData.address,
          intro: formData.intro,
          sport: formData.sport.toUpperCase(),
          userId: formData.userId,
          cover: coverUrl, // Gửi URL thay vì file
          logo: logoUrl, // Gửi URL thay vì file
        };
    
        const response = await createTeamApi.createTeam(requestData, token);
        console.log("Create Team Success:", response.data);

        router.push("/teams");
      } catch (error: any) {
        console.error("Create Team Error:", error.response?.data || error.message);
      }
    };
    

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 border border-gray-300">
        <button className="flex items-center px-4 py-2 mb-4 bg-black text-white rounded" onClick={() => router.back()}>
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">CREATE TEAM</h2>

        {/* Upload Cover */}
        <div className="relative w-full h-60 bg-gray-300 flex justify-center items-center rounded-md overflow-hidden mb-6">
          {coverPreview ? (
            <>
              <Image src={coverPreview} alt="Cover Preview" layout="fill" objectFit="cover" />
              <button className="absolute top-2 right-2 text-white w-6 h-6 rounded-full flex items-center justify-center"
                onClick={() => handleRemoveImage("cover")}>
                ❌
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center text-gray-400 text-xl">
                <Upload size={24} className="text-gray-500 mr-2" />
                <span>Upload Cover</span>
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "cover")}
                className="absolute border inset-0 opacity-0 cursor-pointer" />
            </>
          )}
        </div>

        {/* Upload Logo */}
        <div className="absolute top-52 ml-10 w-52 h-52 bg-gray-200 flex items-center justify-center rounded-md mx-auto mb-4">
          {logoPreview ? (
            <>
              <Image src={logoPreview} alt="Logo Preview" width={200} height={200} className="rounded-md" />
              <button className="absolute top-1 right-1 text-white w-6 h-6 rounded-full flex items-center justify-center"
                onClick={() => handleRemoveImage("logo")}>
                ❌
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center text-gray-400 text-lg">
                <Upload size={24} className="text-gray-500 mr-2" />
                <span>Logo</span>
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logo")}
                className="absolute inset-0 opacity-0 cursor-pointer" />
            </>
          )}
        </div>

        {/* Form nhập thông tin */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4 mt-14">
            <div>
              <label className="text-sm font-semibold">TEAM NAME</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="text-sm font-semibold">ADDRESS</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold">TEAM OVERVIEW</label>
            <textarea name="intro" value={formData.intro} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold">SPORT</label>
            <input type="text" name="sport" value={formData.sport} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" className="px-4 py-2 border rounded">DISCARD</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">CREATE</button>
          </div>
        </form>
      </div>
    );
  };

  export default CreateTeam;
