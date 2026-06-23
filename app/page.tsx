"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CATEGORIES, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "p1",
    name: "Arc Floor Lamp",
    category: "Lighting",
    price: 349,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 124,
    image: "https://m.media-amazon.com/images/I/71iGbMW23UL.jpg",
    badge: "Sale",
    description: "Sculptural brass arc with a linen shade. Adjustable height, warm 2700K glow.",
  },
  {
    id: "p2",
    name: "Linen Cloud Sofa",
    category: "Living Room",
    price: 1890,
    rating: 4.9,
    reviewCount: 87,
    image: "https://divandreams.com/cdn/shop/files/121WE-2-seater-white-linen-side.jpg?v=1768734977&width=3840",
    badge: "Best Seller",
    description: "Deep-seated modular sofa in natural linen. Removable covers, solid oak legs.",
  },
  {
    id: "p3",
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    price: 89,
    originalPrice: 110,
    rating: 4.7,
    reviewCount: 203,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    description: "Hand-thrown stoneware dripper and carafe. Matte glaze in warm sand.",
  },
  {
    id: "p4",
    name: "Walnut Bedside Table",
    category: "Bedroom",
    price: 420,
    rating: 4.6,
    reviewCount: 56,
    image: "https://i.etsystatic.com/33095062/r/il/02f6b8/5378887064/il_fullxfull.5378887064_pxk9.jpg",
    description: "Solid American walnut with a single drawer and open shelf. Dovetail joinery.",
  },
  {
    id: "p5",
    name: "Rattan Pendant Light",
    category: "Lighting",
    price: 195,
    rating: 4.8,
    reviewCount: 91,
    image: "https://ak1.ostkcdn.com/images/products/is/images/direct/1e12aab5975da85f75427833c1a7222e9d727b83/Ravy-15-in-1-Light-Rattan-Pendant-Handwoven-Dome-Kitchen-Island-Hanging-Lights.jpg",
    badge: "New",
    description: "Hand-woven rattan globe pendant. Creates warm dappled light patterns.",
  },
  {
    id: "p6",
    name: "Outdoor Teak Bench",
    category: "Outdoor",
    price: 680,
    originalPrice: 780,
    rating: 4.9,
    reviewCount: 44,
    image: "https://images.urbndata.com/is/image/Anthropologie/81876302_000_b3?$a15-pdp-detail-shot$&fit=constrain&qlt=80&wid=640",
    badge: "Sale",
    description: "FSC-certified teak with stainless steel hardware. Weathers beautifully.",
  },
  {
    id: "p7",
    name: "Merino Throw Blanket",
    category: "Bedroom",
    price: 165,
    rating: 4.7,
    reviewCount: 178,
    image: "https://m.media-amazon.com/images/I/61J1XPV1RPL._AC_UF894,1000_QL80_.jpg",
    badge: "New",
    description: "100% extra-fine merino in a herringbone weave. Naturally temperature-regulating.",
  },
  {
    id: "p8",
    name: "Marble Cheese Board",
    category: "Kitchen",
    price: 75,
    rating: 4.5,
    reviewCount: 132,
    image: "https://picsum.photos/seed/3ddef1dc9905/800/600",
    description: "Honed Carrara marble with walnut handles. Includes four artisan knives.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sophia R.",
    location: "Brooklyn, NY",
    avatar: "https://images.squarespace-cdn.com/content/v1/55ecad93e4b097dd68b71341/1552508220117-2ENOH1V1WPO9B15U9QOK/18922208_10211298040064581_7261989867091406680_n.jpg",
    rating: 5,
    text: "The Arc Floor Lamp transformed my reading corner completely. The quality is exceptional and it arrived beautifully packaged.",
  },
  {
    id: "t2",
    name: "Marcus T.",
    location: "San Francisco, CA",
    avatar: "https://m.media-amazon.com/images/M/MV5BMTg2NzM3MDgzMV5BMl5BanBnXkFtZTcwNjg0MTQ5MQ@@._V1_FMjpg_UX1000_.jpg",
    rating: 5,
    text: "I've ordered three times now. Every piece feels considered and crafted. The Linen Cloud Sofa is the best furniture purchase I've ever made.",
  },
  {
    id: "t3",
    name: "Elise M.",
    location: "Chicago, IL",
    avatar: "https://miro.medium.com/v2/resize:fit:2000/1*nkDs116wlw-_Qd3dmekF3g.jpeg",
    rating: 5,
    text: "Shipping was faster than expected and the returns process was painless. Lumière genuinely cares about the experience end to end.",
  },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Shipping Over $150",
    description: "Complimentary delivery on all orders above $150. White-glove delivery available for large furniture.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Returns",
    description: "Not in love? Return any item within 60 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "2-Year Guarantee",
    description: "Every piece is backed by our craftsmanship guarantee. We stand behind what we sell.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "We partner only with makers who share our commitment to fair wages and sustainable materials.",
  },
];

const COLLECTIONS = [
  {
    id: "c1",
    title: "The Calm Home",
    subtitle: "Bedroom & Bath",
    description: "Soft textures, muted tones, and pieces designed for rest.",
    image: "http://static1.squarespace.com/static/6465e9f0c32fb30720d59d36/t/6605338475d4553e90f33c9b/1720163165345/neutral-home-decor-living-room.jpg?format=1500w",
    accent: "bg-stone-100",
  },
  {
    id: "c2",
    title: "Gathered Light",
    subtitle: "Lighting Edit",
    description: "From sculptural floor lamps to delicate pendants.",
    image: "https://m.media-amazon.com/images/I/81Y7nV3-CLL._AC_UF1000,1000_QL80_.jpg",
    accent: "bg-amber-50",
  },
  {
    id: "c3",
    title: "The Living Room",
    subtitle: "Sofas & Seating",
    description: "Generous forms built for everyday life and long conversations.",
    image: "https://st.hzcdn.com/simgs/3eb1952406f72e55_14-5330/_.jpg",
    accent: "bg-indigo-50",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.16)] transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
              product.badge === "Sale"
                ? "bg-rose-500 text-white"
                : product.badge === "New"
                ? "bg-indigo-600 text-white"
                : "bg-amber-400 text-slate-900"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice != null && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-16">
        {/* Subtle mesh glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/80 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                New Summer Collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.08] tracking-tight text-balance"
            >
              Objects worth
              <br />
              <span className="text-indigo-600">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
            >
              {APP_NAME} brings together independent designers and master craftspeople to create a home that feels genuinely yours. Every piece is chosen for longevity, not trend.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-black/10 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                View Collections
              </motion.a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-5 pt-2"
            >
              {["Free shipping $150+", "60-day returns", "2-year guarantee"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    {item}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg ml-auto">
              {/* Main image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <img
                  src="https://divandreams.com/cdn/shop/files/121WE-2-seater-white-linen-side.jpg?v=1768734977&width=3840"
                  alt="Linen Cloud Sofa in a bright living room"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.55, ease: "easeOut" }}
                className="absolute -left-10 top-12 bg-white rounded-2xl p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 w-44"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <img src="https://m.media-amazon.com/images/I/71iGbMW23UL.jpg" alt="Arc Floor Lamp" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 leading-tight">Arc Floor Lamp</p>
                    <p className="text-xs text-indigo-600 font-bold">$349</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  <span className="text-xs text-slate-400 ml-1">4.8</span>
                </div>
              </motion.div>
              {/* Floating card — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.55, ease: "easeOut" }}
                className="absolute -right-8 bottom-12 bg-white rounded-2xl p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5"
              >
                <p className="text-xs text-slate-500 mb-0.5">This week</p>
                <p className="text-sm font-bold text-slate-900">+2,400 happy homes</p>
                <div className="flex -space-x-2 mt-2">
                  {[
                    "https://images.squarespace-cdn.com/content/v1/55ecad93e4b097dd68b71341/1552508220117-2ENOH1V1WPO9B15U9QOK/18922208_10211298040064581_7261989867091406680_n.jpg",
                    "https://m.media-amazon.com/images/M/MV5BMTg2NzM3MDgzMV5BMl5BanBnXkFtZTcwNjg0MTQ5MQ@@._V1_FMjpg_UX1000_.jpg",
                    "https://miro.medium.com/v2/resize:fit:2000/1*nkDs116wlw-_Qd3dmekF3g.jpeg",
                  ].map((src, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                      <img src={src} alt="Customer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {VALUE_PROPS.map((vp) => (
            <motion.div
              key={vp.title}
              variants={fadeInUp}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <vp.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{vp.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{vp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section id="products" className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                The Shop
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance">
                Thoughtfully chosen,<br />beautifully made.
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 shrink-0"
            >
              View all products <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-black/8 hover:border-indigo-200 hover:text-indigo-700"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Collections ──────────────────────────────────────────────────── */}
      <section id="collections" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
              Collections
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Curated for every room.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative rounded-3xl overflow-hidden group cursor-pointer ${
                  i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-1">
                    {col.subtitle}
                  </p>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                    {col.title}
                  </h3>
                  <p className="text-sm text-white/70 mb-4">{col.description}</p>
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ──────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
                <img
                  src="https://www.acaciaoriginals.com/wp-content/uploads/2024/01/pexels-antoni-shkraba-5466144-scaled.jpg"
                  alt="Artisan crafting furniture in a workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>
              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
                className="absolute -right-6 bottom-10 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              >
                <p className="text-3xl font-bold text-slate-900">140+</p>
                <p className="text-xs text-slate-500 mt-0.5">Independent makers</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                Our Story
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
                Made by hands that care about the work.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                {APP_NAME} was founded in 2018 with a single conviction: that the objects we live with every day should be worth keeping. We travel to workshops in Portugal, Japan, and Scandinavia to find makers who still believe in slow craft.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                Every product on our site has been handled, tested, and lived with by our team before it earns a place in the collection. We keep the range deliberately small so that everything we offer is genuinely exceptional.
              </motion.p>
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
                {[
                  { value: "2018", label: "Founded" },
                  { value: "140+", label: "Makers" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-indigo-50/60 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
              Customer Stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Homes we're proud of.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-300"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm mb-5 text-pretty">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-indigo-100">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────────────────── */}
      <section id="newsletter" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl bg-indigo-600 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* Background glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/50 blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-violet-600/40 blur-[80px]" />
            </div>

            <div className="relative">
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-3"
              >
                Stay in the loop
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 text-balance"
              >
                New arrivals, first.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-indigo-200 text-lg mb-8 max-w-md mx-auto text-pretty"
              >
                Join 18,000 subscribers who get early access to new collections, design stories, and exclusive offers.
              </motion.p>
              <motion.form
                variants={fadeInUp}
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  defaultValue=""
                  className="flex-1 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-6 py-3 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
                >
                  Subscribe
                </motion.button>
              </motion.form>
              <motion.p variants={fadeInUp} className="text-xs text-indigo-300 mt-4">
                No spam, ever. Unsubscribe at any time.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}