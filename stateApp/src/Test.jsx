import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useFetchData from "./hooks/useFetchData";
import useAddItem from "./hooks/useAddItem";

function RecipesManager() {
  const {
    data: datas,
    loading: datasLoading,
    error: datasError,
  } = useFetchData("users");

  const {
    data: imgs,
    loading: imgsLoading,
    error: imgsError,
  } = useFetchData("photos");

  const { localItems: localDatas, addItem: addData } = useAddItem("datas");
  const { localItems: localImgs, addItem: addDataImg } = useAddItem("datasImg");

  useEffect(() => {
    if (datasError) {
      toast.error("Error fetching users!", { autoClose: 1500 });
    }
    if (imgsError) {
      toast.error("Error fetching images!", { autoClose: 1500 });
    }
  }, [datasError, imgsError]);

  return (
    <div
      style={{ maxWidth: "1200px", margin: "15px auto", textAlign: "center" }}
    >
      <h1 style={{ color: "#cefefd" }}>Select User and Image</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {datasLoading || imgsLoading ? (
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%", height: "100vh" }}
          >
            <Spinner animation="border" variant="primary" className="mt-5" />
          </div>
        ) : (
          <>
            {datas.slice(0, 5).map((item) => (
              <div
                key={item.id}
                style={{
                  margin: "10px",
                  width: "200px",
                  height: "175px",
                  backgroundColor: "#cefefd",
                  border: "2px solid #17faf7",
                  borderRadius: "8px",
                  boxShadow: "10 12px 18px rgba(250, 185, 243, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <p className="mt-2">{item.name}</p>
                <div style={{ height: "50px" }}>
                  User: <span>{item.username}</span>
                </div>
                <button
                  onClick={() => addData(item)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: localDatas.some((el) => el.id === item.id)
                      ? "#01615a"
                      : "#00abd1",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {localDatas.some((el) => el.id === item.id)
                    ? "Added"
                    : "Get User"}
                </button>
              </div>
            ))}
            {imgs.slice(0, 5).map((item) => (
              <div
                key={item.id}
                style={{
                  margin: "10px",
                  width: "200px",
                  height: "175px",
                  backgroundColor: "#cefefd",
                  border: "2px solid #17faf7",
                  borderRadius: "8px",
                  boxShadow: "10 12px 18px rgba(250, 185, 243, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <img
                  src={item.url}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => addDataImg(item)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: localImgs.some((el) => el.id === item.id)
                      ? "#01615a"
                      : "#00abd1",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {localImgs.some((el) => el.id === item.id)
                    ? "Added"
                    : "Get Photo"}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="cards">
        <div style={{ width: "25%" }}>
          <h4 style={{ color: "#cefefd" }} className="my-3">
            Selected User
          </h4>

          <ul>
            {localDatas?.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginRight: "30px",
                  color: "#d3e9fe",
                  height: "60px",
                }}
              >
                <h6 style={{ fontSize: "18px" }}>{item.name}</h6>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: "25%" }}>
          <h4 style={{ color: "#cefefd" }} className="my-3">
            Selected Image
          </h4>

          <ul>
            {localImgs?.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginRight: "25px",
                  borderRadius: "8px",
                  height: "60px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{
                      width: "100px",
                      height: "50px",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    src={item.url}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipesManager;
