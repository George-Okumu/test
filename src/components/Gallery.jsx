import { useState } from "react"
import { Button } from "../components/ui/button.jsx"
import { Input } from "../components/ui/input.jsx"
import { ChevronDown, MoreHorizontal, Search } from 'lucide-react'
import { photos } from "../utils/dummy.js"

import Card from "./Card.jsx"
import Form from "./form.jsx"


export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState("Photos")
  const [openModal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-white grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-emerald-500">RiftValley</div>
          <h1 className="text-xl font-semibold">DevFest</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for free photos"
              className="w-64 pl-10 bg-gray-100"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setModal(true)}>Upload</Button>
          <Button variant="ghost">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Join</Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-8">
        <h2 className="text-4xl font-bold mb-8">Free Website Photos</h2>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            {["Photos", "Users"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "secondary" : "ghost"}
                className="font-semibold"
                onClick={() => setActiveTab(tab)}
              >
                {tab} <span className="ml-2 text-gray-500">{tab === "Photos" ? "135" : "798"}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="space-x-2">
              <span>Filters</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="space-x-2">
              <span>Popular</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} image_url={photo.src} description={photo.description} title={photo.title}/>
          ))}
        </div>
      </main>

      <Form isOpen={openModal} onClose={setModal}/>
    </div>
  )
}
