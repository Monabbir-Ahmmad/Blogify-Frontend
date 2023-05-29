import BlogItem from "../components/blog/blogItem";

function HomePage() {
  return (
    <section className="p-5 w-full inline-flex justify-center">
      <div className="max-w-6xl w-full space-y-5">
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="text-primary">Blogify</span>
        </h1>

        <p className="text-base opacity-80 uppercase">View recent blogs</p>

        <hr />

        <div className="grid grid-cols-3 gap-4">
          {[1, 23, 4, 5, 6, 78, 4].map((item) => (
            <BlogItem
              key={item}
              blog={{
                title: "Blog Title",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!",
                coverImage: "https://picsum.photos/seed/picsum/200/300",
                createdAt: new Date(),

                user: {
                  id: 1,
                  name: "John Doe",
                  profileImage: "https://picsum.photos/seed/picsum/200/300",
                },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
