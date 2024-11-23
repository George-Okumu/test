
export default function Card({ title, image_url, description, ...props }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow hover:scale-105 transition-transform duration-300" {...props}>
      {/* Card Image */}
      <a href="#">
        <img
          className="rounded-t-lg h-60 w-full"
          src={image_url || "default-image.jpg"}  // Use a default image if no image URL is passed
          alt={title || "Card Image"}
        />
      </a>
      
      {/* Card Content */}
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {title || "Default Title"}  {/* Default title if none is provided */}
          </h5>
        </a>
        <p className="mb-3 font-small text-gray-700 dark:text-gray-400">
          {description || "Default description text."}  {/* Default description if none is provided */}
        </p>
      </div>
    </div>
  );
}

