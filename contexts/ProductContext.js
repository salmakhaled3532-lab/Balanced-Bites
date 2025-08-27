import { createContext, useContext, useState, useEffect } from 'react';
import productsData from '@/data/products';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load products from localStorage or use default data
    const storedProducts = localStorage.getItem('admin_products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        setProducts(productsData);
      }
    } else {
      setProducts(productsData);
    }

    // Extract unique categories
    const uniqueCategories = [...new Set(productsData.map(p => p.category))];
    const storedCategories = localStorage.getItem('admin_categories');
    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories));
      } catch (error) {
        setCategories(uniqueCategories);
      }
    } else {
      setCategories(uniqueCategories);
    }
  }, []);

  const saveToStorage = (newProducts, newCategories) => {
    localStorage.setItem('admin_products', JSON.stringify(newProducts));
    if (newCategories) {
      localStorage.setItem('admin_categories', JSON.stringify(newCategories));
    }
  };

  // Product Management
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveToStorage(updatedProducts);
    return newProduct;
  };

  const updateProduct = (productId, productData) => {
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, ...productData, updatedAt: new Date().toISOString() }
        : product
    );
    
    setProducts(updatedProducts);
    saveToStorage(updatedProducts);
    return updatedProducts.find(p => p.id === productId);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    saveToStorage(updatedProducts);
    return true;
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === parseInt(productId));
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  // Category Management
  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      const updatedCategories = [...categories, categoryName];
      setCategories(updatedCategories);
      saveToStorage(products, updatedCategories);
      return true;
    }
    return false;
  };

  const updateCategory = (oldName, newName) => {
    const updatedCategories = categories.map(cat => cat === oldName ? newName : cat);
    const updatedProducts = products.map(product => 
      product.category === oldName ? { ...product, category: newName } : product
    );
    
    setCategories(updatedCategories);
    setProducts(updatedProducts);
    saveToStorage(updatedProducts, updatedCategories);
    return true;
  };

  const deleteCategory = (categoryName) => {
    // Check if any products use this category
    const productsInCategory = products.filter(p => p.category === categoryName);
    if (productsInCategory.length > 0) {
      return { success: false, error: `Cannot delete category. ${productsInCategory.length} products are using this category.` };
    }

    const updatedCategories = categories.filter(cat => cat !== categoryName);
    setCategories(updatedCategories);
    saveToStorage(products, updatedCategories);
    return { success: true };
  };

  // Analytics
  const getProductStats = () => {
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      productsByCategory: categories.map(cat => ({
        category: cat,
        count: products.filter(p => p.category === cat).length
      })),
      recentProducts: products
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5)
    };
  };

  const value = {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getProductStats
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
