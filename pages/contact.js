import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Wholefoods Store</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-4">Have questions or want to reach out? Fill out the form below or email us at <a href="mailto:info@wholefoods.com" className="text-green-700 underline">info@wholefoods.com</a>.</p>
        <form className="max-w-lg space-y-4">
          <input type="text" placeholder="Your Name" className="w-full border rounded px-3 py-2" required />
          <input type="email" placeholder="Your Email" className="w-full border rounded px-3 py-2" required />
          <textarea placeholder="Your Message" className="w-full border rounded px-3 py-2" rows={4} required />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Send</button>
        </form>
      </main>
    </>
  );
}
