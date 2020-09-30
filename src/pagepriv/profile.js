import React, { useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import "./profile.css"
import { ImageModal } from "../components/imageModal"

export const Profile = props => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState({})
  const [isUploading, setIsUploading] = useState(false)
  const { request } = useHttp()
  const { id } = props

  useEffect(() => {
    async function getProfile(id) {
      const data = await request(`/api/profile/${id}`, "GET")
      console.log(data)
      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }
      setProfileData(data)
      setLoading(false)
    }
    getProfile(id)
  }, [])

  const uploadHandler = () => {
      setIsUploading(!isUploading)
  }
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  return (
    <>
    <div>
      <ImageModal
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      ></ImageModal>
      <div className = "user-image-wrap">
      {profileData.imageUrl ? <img src={profileData.imageUrl} alt="Your Avatar" className = {`user-image`}/> : `No avatar yet!`}

      </div>
      Your email is: {profileData.email}
    </div>
    <button onClick={uploadHandler}>Upload image!</button>
    </>
  )
}

