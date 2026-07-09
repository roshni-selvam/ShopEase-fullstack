package com.example.trendyvibe.component;

import com.example.trendyvibe.model.Product;
import com.example.trendyvibe.model.User;
import com.example.trendyvibe.repository.ProductRepository;
import com.example.trendyvibe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProductRepository productRepository;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        // ADMIN
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println(" Admin created!");
        }

        // PRODUCTS
        if (productRepository.count() == 0) {
            List<Product> products = List.of(

                    // WESTERN
                    new Product(null, "Floral Midi Dress",      "western",     "Chiffon",        1499.0, 20, "https://i.pinimg.com/1200x/5b/ce/c2/5bcec2d8f37c3dd377beb6e638f74078.jpg"),
                    new Product(null, "Black Maxi Dress",       "western",     "Rayon",          1799.0, 15, "https://i.pinimg.com/1200x/0c/15/48/0c15486bbf87384d38e2a5dc91592ad1.jpg"),
                    new Product(null, "Yellow Sundress",        "western",     "Cotton",         1299.0, 25, "https://i.pinimg.com/1200x/0f/ae/b7/0faeb7ff2754025b37ba70f3d4c67160.jpg"),
                    new Product(null, "Denim Shirt Dress",      "western",     "Denim",          1599.0, 10, "https://i.pinimg.com/1200x/2a/4c/e0/2a4ce02cb05683825ed11625476543ef.jpg"),
                    new Product(null, "Red Bodycon Dress",      "western",     "Spandex",        1699.0, 18, "https://i.pinimg.com/736x/b9/bf/af/b9bfaffee0f3824144b03fe3ab63c643.jpg"),
                    new Product(null, "White Wrap Dress",       "western",     "Georgette",      1399.0, 22, "https://i.pinimg.com/736x/ef/34/67/ef34676e121942d4576f07370041c052.jpg"),
                    new Product(null, "Lavender Tier Dress",    "western",     "Cotton Blend",   1499.0, 12, "https://i.pinimg.com/736x/e3/dc/33/e3dc3331de182ca01bb45c0508f6763a.jpg"),
                    new Product(null, "Green Printed Dress",    "western",     "Linen",          1449.0, 20, "https://i.pinimg.com/1200x/a2/0f/57/a20f5779490712b450fe8f80f97d1dfb.jpg"),
                    new Product(null, "Polka Dot Dress",        "western",     "Crepe",          1599.0, 15, "https://i.pinimg.com/1200x/3f/45/f8/3f45f89b0d0d002a9360498a6d8997d2.jpg"),
                    new Product(null, "Off-Shoulder Dress",     "western",     "Satin",          1399.0, 30, "https://i.pinimg.com/1200x/99/9d/14/999d14d05f2b123ea50148f28520fb66.jpg"),
                    new Product(null, "Satin Slip Dress",       "western",     "Satin",          1899.0, 25, "https://i.pinimg.com/736x/54/58/1e/54581e174dd05150349c48b2ca5192fa.jpg"),
                    new Product(null, "Blazer Dress",           "western",     "Polyester",      1999.0, 18, "https://i.pinimg.com/736x/12/e8/1e/12e81e4acfaaf8d1073eb64e67a8fe7d.jpg"),

                    // PARTY
                    new Product(null, "Sequin Gown",            "party",       "Sequin Fabric",  2999.0, 25, "https://i.pinimg.com/736x/a6/73/2c/a6732cf5ae1626ae4f5142432705bc1d.jpg"),
                    new Product(null, "Velvet Bodycon",         "party",       "Velvet",         2499.0, 30, "https://i.pinimg.com/736x/7b/9b/d9/7b9bd91f24356cc98cde53791c0c6b39.jpg"),
                    new Product(null, "Shimmer Co-ord Set",     "party",       "Shimmer Fabric", 2599.0, 20, "https://i.pinimg.com/1200x/24/ac/4d/24ac4dd905801d3bb9240e616b428fa2.jpg"),
                    new Product(null, "Glitter Blazer",         "party",       "Glitter Knit",   3199.0, 18, "https://i.pinimg.com/1200x/54/14/1b/54141b130e782beefdb6ee287fad7b14.jpg"),
                    new Product(null, "Satin Slip Gown",        "party",       "Satin",          1999.0, 22, "https://i.pinimg.com/1200x/37/d9/9a/37d99a7ab9e18128e7045a71fa4c6bcf.jpg"),
                    new Product(null, "Feather Trim Top",       "party",       "Mesh + Feather", 1699.0, 15, "https://i.pinimg.com/736x/28/de/d8/28ded8d0ed10f861b99ca055a43677d7.jpg"),
                    new Product(null, "Ruched Party Dress",     "party",       "Jersey",         1599.0, 28, "https://i.pinimg.com/1200x/9d/33/7e/9d337eadea4b2c0aa1d04e8e1dfb2f79.jpg"),
                    new Product(null, "Lace Bodysuit + Skirt",  "party",       "Lace",           2299.0, 20, "https://i.pinimg.com/736x/13/41/0c/13410cd4c1bdb2690b37feda0b739e13.jpg"),
                    new Product(null, "Cut-Out Midi Dress",     "party",       "Crepe",          2099.0, 25, "https://i.pinimg.com/1200x/e4/15/0a/e4150a94ade7ccd4aea6cea83c52678c.jpg"),
                    new Product(null, "Halter Neck Gown",       "party",       "Chiffon",        2799.0, 15, "https://i.pinimg.com/736x/b8/20/bf/b820bf232533b2a420c32a88404c4c40.jpg"),
                    new Product(null, "Asymmetric Hem Dress",   "party",       "Georgette",      1899.0, 20, "https://i.pinimg.com/1200x/09/6e/3f/096e3fd1f501597c804c7b75bde1977f.jpg"),
                    new Product(null, "Plisse Pleated Gown",    "party",       "Polyester",      3299.0, 30, "https://i.pinimg.com/1200x/d0/71/6b/d0716b9a1b56cb19a7d9612ef8126867.jpg"),

                    // TRADITIONAL
                    new Product(null, "Kanjivaram Silk Saree",  "traditional", "Silk",           4999.0, 10, "https://i.pinimg.com/736x/5a/43/7a/5a437a9963220b06bb3ee1f0dc9991a6.jpg"),
                    new Product(null, "Anarkali Suit",          "traditional", "Net + Silk",     2799.0, 18, "https://i.pinimg.com/736x/f9/90/9b/f9909b940d4019193bb1c7bfb1116305.jpg"),
                    new Product(null, "Lehenga Choli",          "traditional", "Banarasi Silk",  5999.0, 25, "https://i.pinimg.com/736x/ee/d8/84/eed8844e338fcb08f866644b248a566d.jpg"),
                    new Product(null, "Cotton Salwar Kameez",   "traditional", "Cotton",         1299.0, 12, "https://i.pinimg.com/736x/58/1a/6d/581a6d2ca940f184a8bcf2efb5948212.jpg"),
                    new Product(null, "Langa Voni",             "traditional", "Silk",           2499.0, 15, "https://i.pinimg.com/736x/03/a5/6b/03a56b2b811d84ca1bad929639b60320.jpg"),
                    new Product(null, "Lucknowi Chikankari",    "traditional", "Pashmina",       1899.0, 22, "https://i.pinimg.com/1200x/81/09/42/81094217b9385e9864ac823a6f1de317.jpg"),
                    new Product(null, "Embroidered Dupatta Set","traditional", "Chiffon",        2099.0, 18, "https://i.pinimg.com/736x/1c/87/cb/1c87cb233db523c7230aed4afeae8589.jpg"),
                    new Product(null, "Bandhani Saree",         "traditional", "Cotton Silk",    1799.0, 10, "https://i.pinimg.com/736x/07/b4/c5/07b4c5d2c0d6840d50e7228c51478f6a.jpg"),
                    new Product(null, "Mirror Work Kurti",      "traditional", "Rayon",          1099.0, 25, "https://i.pinimg.com/736x/ea/e5/2e/eae52ec9ce71780c15a9bc7fe784651a.jpg"),
                    new Product(null, "Gharara Set",            "traditional", "Silk Cotton",    1699.0, 15, "https://i.pinimg.com/736x/87/66/bb/8766bb330c39ab21d0ad373b8892cb52.jpg"),
                    new Product(null, "Mundum Neriyathum",      "traditional", "Silk Cotton",    2299.0, 20, "https://i.pinimg.com/736x/85/d3/d6/85d3d67f607c89a41f4bf1bd26ce014b.jpg"),
                    new Product(null, "Chaniya Choli",          "traditional", "Silk Cotton",    1599.0, 20, "https://i.pinimg.com/1200x/16/ab/b6/16abb6af5d4ed543c1ac8652de481f58.jpg"),
                    // SAREES
                    new Product(null, "Banarasi  Saree", "sarees", "Banarasi Silk", 6999.0, 10, "https://i.pinimg.com/1200x/20/09/b0/2009b038ab57f8b255684f542f5764c6.jpg"),
                    new Product(null, "Soft Silk Saree", "sarees", "Soft Silk", 3499.0, 15, "https://i.pinimg.com/736x/89/14/a0/8914a0fca1385316b9eb097f2e829c85.jpg"),
                    new Product(null, "Floral Organza Saree", "sarees", "Organza", 2899.0, 20, "https://i.pinimg.com/736x/39/8c/ac/398cac114848440083f28dc49330ef06.jpg"),
                    new Product(null, "Designer Party Saree", "sarees", "Georgette", 4599.0, 18, "https://i.pinimg.com/736x/d8/20/76/d820763d06e0bd4a37e3caff5a47352e.jpg"),
                    new Product(null, "Cotton Printed Saree", "sarees", "Cotton", 1999.0, 25, "https://i.pinimg.com/736x/ab/b1/c4/abb1c48c394213c51c4be50e557fd7d5.jpg"),
                    new Product(null, "Kanjipuram  Saree", "sarees", "Pure Silk", 7999.0, 8, "https://i.pinimg.com/736x/08/f3/f7/08f3f7a2bbc389b467c7909aabbb1925.jpg"),
                    new Product(null, "Embroidered Silk Saree", "sarees", "Silk", 5599.0, 12, "https://i.pinimg.com/736x/e1/0b/ba/e10bba0a43d34c201b51b8cfcfb1fc1a.jpg"),
                    new Product(null, "Pastel Designer Saree", "sarees", "Net", 3899.0, 15, "https://i.pinimg.com/1200x/7d/ee/6b/7dee6b38b5ad5318c321578fbe89fee9.jpg"),
                    new Product(null, "Festival Wear Saree", "sarees", "Cotton Silk", 2799.0, 18, "https://i.pinimg.com/1200x/f8/f7/5f/f8f75f2d6be912135ae009fbe06576e6.jpg"),
                    new Product(null, "Traditional Temple Saree", "sarees", "Kanjivaram", 6499.0, 9, "https://i.pinimg.com/1200x/ba/7b/4a/ba7b4ae7a3a678f52cf5f51bc51aea07.jpg"),
                    new Product(null, "Lightweight Daily Saree", "sarees", "Linen", 1499.0, 30, "https://i.pinimg.com/1200x/25/43/79/2543799b3af1e2a0c35b112e71f75763.jpg"),
                    new Product(null, "Golden Border Saree", "sarees", "Art Silk", 2299.0, 20, "https://i.pinimg.com/1200x/0d/d3/3e/0dd33e6cac4482694de3182654190fe5.jpg"),

                    // CASUAL
                    new Product(null, "Oversized T-Shirt", "casual", "Cotton", 999.0, 30, "https://i.pinimg.com/736x/b4/a3/7e/b4a37eaae2c868e06aaf7e64513c636e.jpg"),
                    new Product(null, "Casual Denim Jacket", "casual", "Denim", 2499.0, 20, "https://i.pinimg.com/1200x/0e/71/60/0e71608ce4dc6e2addd9535a77a27db0.jpg"),
                    new Product(null, "Crop Top Combo", "casual", "Cotton Blend", 1299.0, 25, "https://i.pinimg.com/1200x/12/1d/42/121d428ad69bb0c019a5580ee58618e3.jpg"),
                    new Product(null, "Jogger Pants", "casual", "Fleece", 1499.0, 18, "https://i.pinimg.com/736x/85/d4/96/85d496551bb78c98cd4a16d7c03682d7.jpg"),
                    new Product(null, "Casual Hoodie", "casual", "Wool Blend", 1999.0, 15, "https://i.pinimg.com/1200x/ac/ea/2b/acea2bcf7fcf6dece7f192e508afd802.jpg"),
                    new Product(null, "Everyday Kurti", "casual", "Rayon", 1199.0, 28, "https://i.pinimg.com/736x/66/25/b7/6625b704bdaaae577aa4816099510d23.jpg"),
                    new Product(null, "Basic White Tee", "casual", "Cotton", 799.0, 35, "https://i.pinimg.com/1200x/c6/f6/b2/c6f6b22b2a86d6aaab03763f6191920c.jpg"),
                    new Product(null, "Loose Fit Jeans", "casual", "Denim", 1799.0, 22, "https://i.pinimg.com/736x/75/f0/64/75f06462fb969d1514d8c9678a9a57a5.jpg"),
                    new Product(null, "Checked Shirt", "casual", "Linen", 1399.0, 20, "https://i.pinimg.com/736x/b2/07/00/b2070039c4ac45073f826e8028c72e45.jpg"),
                    new Product(null, "Casual Summer Dress", "casual", "Crepe", 1599.0, 16, "https://i.pinimg.com/1200x/3c/99/d1/3c99d17985ed8b1d7d8a1bd8af3ffad3.jpg"),
                    new Product(null, "Street Style Hoodie", "casual", "Fleece", 2199.0, 14, "https://i.pinimg.com/1200x/90/52/e3/9052e3eeafd47149cce2104d789c76c0.jpg"),
                    new Product(null, "Everyday Co-ord Set", "casual", "Polyester", 1899.0, 18, "https://i.pinimg.com/1200x/d6/a7/49/d6a7498a9afd1c7c9c6d2cd25114feea.jpg")
            );

            productRepository.saveAll(products);
            System.out.println("60 Products seeded!");
        }
    }
}