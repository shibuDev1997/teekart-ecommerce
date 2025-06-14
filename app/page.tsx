import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, Shield, Headphones, Star, Sparkles, Zap, Heart, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { dummyProducts } from "@/lib/dummy-data"

export default function HomePage() {
  const featuredProducts = dummyProducts.filter((p) => p.featured).slice(0, 8)
  const trendingProducts = dummyProducts.filter((p) => p.trending).slice(0, 8)

  return (
    <div className="space-y-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen gradient-sage text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage-cream/20 rounded-full blur-3xl animate-pulse animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-light/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sage-medium/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center space-x-2 animate-bounce-gentle">
                <Leaf className="h-6 w-6 text-sage-cream" />
                <Badge className="bg-sage-cream text-sage-dark border-0 font-semibold px-4 py-2 shadow-lg">
                  Eco-Friendly Collection 2024
                </Badge>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-sage-cream bg-clip-text text-transparent animate-gradient">
                  Premium T-Shirts
                </span>
                <br />
                <span className="text-4xl lg:text-6xl bg-gradient-to-r from-sage-cream to-sage-light bg-clip-text text-transparent animate-gradient delay-300">
                  for Boys & Girls
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-sage-cream/90 leading-relaxed animate-fade-in-up delay-500">
                Discover comfort meets style in every piece. Made with premium organic cotton blend for ultimate comfort
                and sustainability.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-700">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-sage-cream text-sage-dark hover:bg-white hover:text-sage-dark border-0 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-sage-cream/25 animate-glow"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products?category=boys">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-sage-cream/50 text-sage-cream hover:bg-sage-cream hover:text-sage-dark px-8 py-4 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                  >
                    Boys Collection
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8 animate-fade-in-up delay-1000">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-cream">10K+</div>
                  <div className="text-sm text-sage-cream/80">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-cream">500+</div>
                  <div className="text-sm text-sage-cream/80">Products</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-sage-cream text-sage-cream" />
                    ))}
                  </div>
                  <div className="text-sm text-sage-cream/80">5.0 Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="relative animate-fade-in-right">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-sage-cream rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src="/images/hero-boy.png"
                      alt="Boys T-Shirt Collection"
                      width={300}
                      height={400}
                      className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 object-cover"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-sage-light rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src="/images/tshirt-1.jpg"
                      alt="Premium T-Shirt"
                      width={300}
                      height={300}
                      className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-sage-medium rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src="/images/hero-girl.png"
                      alt="Girls T-Shirt Collection"
                      width={300}
                      height={400}
                      className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 object-cover"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-sage-dark rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src="/images/tshirt-2.jpg"
                      alt="Trendy T-Shirt"
                      width={300}
                      height={300}
                      className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-sage-cream/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-sage-cream rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "Free shipping on orders above ₹1000",
              color: "bg-sage-medium",
            },
            {
              icon: Shield,
              title: "Quality Guarantee",
              desc: "Premium organic cotton with quality assurance",
              color: "bg-sage-light",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              desc: "Round the clock customer support",
              color: "bg-sage-dark",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 gradient-sage-light overflow-hidden"
            >
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-sage-cream/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${feature.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-sage-dark group-hover:text-sage-dark transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sage-dark/70 leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-sage-medium text-white border-0 px-4 py-2">Collections</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-sage-dark to-sage-medium bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-xl text-sage-dark/70 max-w-2xl mx-auto">
            Find the perfect t-shirt for every style and occasion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              href: "/products?category=boys",
              image: "/images/boys-category.jpg",
              title: "Boys Collection",
              subtitle: "Cool & Trendy Designs",
              gradient: "from-sage-dark to-sage-medium",
            },
            {
              href: "/products?category=girls",
              image: "/images/girls-category.jpg",
              title: "Girls Collection",
              subtitle: "Cute & Stylish Designs",
              gradient: "from-sage-medium to-sage-light",
            },
          ].map((category, index) => (
            <Link key={index} href={category.href} className="group block">
              <Card className="overflow-hidden border-0 shadow-2xl transform group-hover:scale-105 transition-all duration-700 bg-gradient-to-br from-white to-sage-cream/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white transform group-hover:scale-110 transition-transform duration-500">
                      <h3 className="text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg">{category.title}</h3>
                      <p className="text-lg lg:text-xl mb-6 opacity-90">{category.subtitle}</p>
                      <Button className="bg-sage-cream text-sage-dark hover:bg-white hover:text-sage-dark px-8 py-3 font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl">
                        Explore Collection
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div>
            <Badge className="mb-4 bg-sage-light text-sage-dark border-0 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Featured
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-sage-dark to-sage-medium bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-sage-dark/70">Hand-picked favorites from our collection</p>
          </div>
          <Link href="/products?featured=true">
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-sage-medium text-sage-medium hover:bg-sage-medium hover:text-white transition-all duration-300"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="gradient-sage-light relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-sage-cream/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-medium/20 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <Badge className="mb-4 bg-sage-dark text-white border-0 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Trending
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-sage-dark to-sage-medium bg-clip-text text-transparent">
                Trending Now
              </h2>
              <p className="text-xl text-sage-dark/70">What's popular among our customers</p>
            </div>
            <Link href="/products?trending=true">
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-sage-dark text-sage-dark hover:bg-sage-dark hover:text-white transition-all duration-300"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="gradient-sage text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-sage-cream/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sage-light/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sage-cream/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <Badge className="mb-6 bg-sage-cream/20 text-sage-cream border-sage-cream/30 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Stay Connected
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl lg:text-2xl mb-12 text-sage-cream/90 leading-relaxed">
              Subscribe to get special offers, free giveaways, and updates on new eco-friendly arrivals
            </p>
            <div className="max-w-md mx-auto flex gap-4 animate-fade-in-up delay-300">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-sage-dark placeholder-sage-dark/50 border-0 focus:ring-4 focus:ring-sage-cream/20 transition-all duration-300 bg-sage-cream"
              />
              <Button className="bg-sage-cream text-sage-dark hover:bg-white hover:text-sage-dark px-8 py-4 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
