import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Heart, Truck } from "lucide-react";
import handicraftsImage from "@/assets/handicrafts.jpg";

const products = [
  {
    id: 1,
    name: "Sohrai Wall Art",
    description: "Traditional tribal wall painting by Hazaribagh artists",
    image: handicraftsImage,
    price: "₹1,250",
    originalPrice: "₹1,500",
    rating: 4.9,
    reviews: 24,
    category: "Art & Crafts",
    artisan: "Sunita Devi",
    village: "Hazaribagh"
  },
  {
    id: 2,
    name: "Bamboo Handicrafts Set",
    description: "Eco-friendly bamboo baskets and decorative items",
    image: handicraftsImage,
    price: "₹850",
    originalPrice: "₹1,000",
    rating: 4.8,
    reviews: 18,
    category: "Home Decor",
    artisan: "Ravi Kumar",
    village: "Dumka"
  },
  {
    id: 3,
    name: "Traditional Dhokra Jewelry",
    description: "Handcrafted bronze jewelry using ancient techniques",
    image: handicraftsImage,
    price: "₹2,100",
    originalPrice: "₹2,500",
    rating: 5.0,
    reviews: 35,
    category: "Jewelry",
    artisan: "Meera Das",
    village: "Khunti"
  }
];

const LocalMarketplace = () => {
  return (
    <section id="marketplace" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cultural text-cultural-foreground" variant="secondary">
            Local Marketplace
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Support Local
            <span className="block text-transparent bg-gradient-to-r from-cultural to-accent bg-clip-text">
              Artisans & Crafts
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic handcrafted products directly from skilled artisans across 
            Jharkhand's tribal communities. Every purchase supports local livelihoods.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-cultural to-accent rounded-2xl p-8 mb-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Tribal Heritage Festival Sale</h3>
              <p className="text-white/90">Get 20% off on all traditional handicrafts this month</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="secondary" size="lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shop Festival Collection
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="cultural" size="sm">All Products</Button>
          <Button variant="outline" size="sm">Art & Crafts</Button>
          <Button variant="outline" size="sm">Jewelry</Button>
          <Button variant="outline" size="sm">Home Decor</Button>
          <Button variant="outline" size="sm">Textiles</Button>
          <Button variant="outline" size="sm">Pottery</Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-cultural text-cultural-foreground">
                    {product.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                {product.originalPrice && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="destructive">
                      {Math.round(((parseInt(product.originalPrice.slice(1)) - parseInt(product.price.slice(1))) / parseInt(product.originalPrice.slice(1))) * 100)}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  By {product.artisan}, {product.village}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free delivery in 3-5 days</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="cultural" className="flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Browse All Products
            <ShoppingBag className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocalMarketplace;