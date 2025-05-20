// Fonction pour gérer les erreurs de chargement d'images
function handleImageError(img) {
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x400?text=Image+non+disponible';
    };
}

const products = [
    {
        id: 1,
        name: "Smartphone Premium XS",
        price: 899.99,
        category: "electronics",
        description: "Le dernier smartphone haut de gamme avec un écran AMOLED de 6,5 pouces, un processeur ultra-rapide et un appareil photo professionnel.",
        image: "https://via.placeholder.com/400x400?text=Smartphone"
    },
    {
        id: 2,
        name: "Laptop Pro 15",
        price: 1299.99,
        category: "electronics",
        description: "Un ordinateur portable puissant avec un écran 4K de 15 pouces, 16 Go de RAM et un SSD de 1 To pour toutes vos tâches professionnelles.",
        image: "https://via.placeholder.com/400x400?text=Laptop"
    },
    {
        id: 3,
        name: "Écouteurs sans fil",
        price: 149.99,
        category: "electronics",
        description: "Des écouteurs sans fil avec une qualité audio exceptionnelle, une autonomie de 30 heures et une réduction active du bruit.",
        image: "https://via.placeholder.com/400x400?text=Écouteurs"
    },
    {
        id: 4,
        name: "Montre intelligente",
        price: 249.99,
        category: "electronics",
        description: "Une montre connectée avec suivi de la santé, GPS intégré, et résistance à l'eau pour toutes vos activités quotidiennes.",
        image: "https://via.placeholder.com/400x400?text=Montre"
    },
    {
        id: 5,
        name: "T-shirt Premium",
        price: 29.99,
        category: "clothing",
        description: "Un t-shirt en coton 100% bio de haute qualité avec une coupe moderne et un design élégant.",
        image: "https://via.placeholder.com/400x400?text=T-shirt"
    },
    {
        id: 6,
        name: "Jean Slim Fit",
        price: 59.99,
        category: "clothing",
        description: "Un jean slim fit parfaitement ajusté, fabriqué à partir de denim durable et confortable pour un style quotidien.",
        image: "https://via.placeholder.com/400x400?text=Jean"
    },
    {
        id: 7,
        name: "Veste en cuir",
        price: 199.99,
        category: "clothing",
        description: "Une veste en cuir véritable au design intemporel, parfaite pour ajouter une touche d'élégance à votre garde-robe.",
        image: "https://via.placeholder.com/400x400?text=Veste"
    },
    {
        id: 8,
        name: "Chaussures de sport",
        price: 89.99,
        category: "clothing",
        description: "Des chaussures de sport légères et respirantes avec un amorti supérieur pour un confort optimal pendant vos activités.",
        image: "https://via.placeholder.com/400x400?text=Chaussures"
    },
    {
        id: 9,
        name: "Machine à café",
        price: 129.99,
        category: "home",
        description: "Une machine à café programmable avec broyeur intégré pour préparer le café parfait à tout moment de la journée.",
        image: "https://via.placeholder.com/400x400?text=Café"
    },
    {
        id: 10,
        name: "Robot aspirateur",
        price: 299.99,
        category: "home",
        description: "Un robot aspirateur intelligent qui nettoie automatiquement votre maison, avec cartographie avancée et contrôle par application.",
        image: "https://via.placeholder.com/400x400?text=Robot"
    },
    {
        id: 11,
        name: "Ensemble de casseroles",
        price: 149.99,
        category: "home",
        description: "Un ensemble de casseroles de haute qualité avec revêtement antiadhésif et poignées ergonomiques pour une cuisine facile.",
        image: "https://via.placeholder.com/400x400?text=Casseroles"
    },
    {
        id: 12,
        name: "Lampe de table design",
        price: 79.99,
        category: "home",
        description: "Une lampe de table élégante avec réglage d'intensité et design moderne qui s'adapte à tous les intérieurs.",
        image: "https://via.placeholder.com/400x400?text=Lampe"
    }
];