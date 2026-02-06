"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Home,
  Ruler,
  Paintbrush,
  Clock,
  Calendar,
  Shield,
  Sparkles,
  Zap,
  Star,
  Award,
  Download,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { axiosRequest } from "@/utils/axios";
import Link from "next/link";

interface RepairStyle {
  id: string;
  name: string;
  description: string;
  pricePerSqm: number;
  timeMultiplier: number;
  image: string;
  features: string[];
  is_active: boolean;
  created_at: number;
}

interface CalculationResult {
  area: string;
  selectedStyleId: string;
  selectedStyleName: string;
  repairTypeId: string;
  repairTypeName: string;
  totalCost: number;
  estimatedDays: number;
  timestamp: number;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut", 
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HomePage() {
  const [area, setArea] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [repairStyles, setRepairStyles] = useState<RepairStyle[]>([]);

  // Load saved calculation from localStorage
  useEffect(() => {
    const savedCalculation = localStorage.getItem("lastRepairCalculation");
    if (savedCalculation) {
      try {
        const calculation: CalculationResult = JSON.parse(savedCalculation);
        setArea(calculation.area);
        setSelectedStyle(calculation.selectedStyleId);
        setShowResults(true);
      } catch (error) {
        console.error("Error parsing saved calculation:", error);
      }
    }
  }, []);

  // Load repair styles from API
  useEffect(() => {
    async function getRepairStyles() {
      try {
        let { data } = await axiosRequest.get("/services/categories/");
        // Make sure the API response matches our interface
        const formattedData: RepairStyle[] = data.map((item: any) => ({
          id: item.id,
          name: item.name || item.title,
          description: item.description || "",
          pricePerSqm: item.pricePerSqm || item.price || 0,
          timeMultiplier: item.timeMultiplier || 1,
          image: item.image || "",
          features: item.features || [],
          is_active: item.is_active || true,
          created_at: item.created_at || Date.now(),
        }));
        setRepairStyles(formattedData);
      } catch (error) {
        console.error("Error fetching repair styles:", error);
      }
    }
    getRepairStyles();
  }, []);

  const selectedStyleData = repairStyles.find((s) => s.id === selectedStyle);
  const totalCost =
    selectedStyleData && area
      ? parseFloat(area) * selectedStyleData.pricePerSqm
      : 0;

  const baseDays = area ? Math.ceil(parseFloat(area) / 10) * 7 : 0;
  const estimatedDays = selectedStyleData
    ? Math.ceil(baseDays * selectedStyleData.timeMultiplier)
    : 0;

  const handleCalculate = () => {
    if (area && selectedStyle && selectedStyleData) {
      setShowResults(true);

      // Get repair type from URL or default
      const urlParams = new URLSearchParams(window.location.search);
      const repairTypeId = urlParams.get("type") || "standard";
      const repairTypeName = getRepairTypeName(repairTypeId);

      // Save calculation to localStorage with repair type
      const calculation: CalculationResult = {
        area,
        selectedStyleId: selectedStyle,
        selectedStyleName: selectedStyleData.name,
        repairTypeId,
        repairTypeName,
        totalCost,
        estimatedDays,
        timestamp: Date.now(),
      };

      localStorage.setItem(
        "lastRepairCalculation",
        JSON.stringify(calculation),
      );

      // Also save to calculation history
      const historyStr = localStorage.getItem("repairCalculationHistory");
      const history = historyStr ? JSON.parse(historyStr) : [];
      history.unshift({
        ...calculation,
        date: new Date().toISOString(),
        id: `calc_${Date.now()}`,
      });

      // Keep only last 10 calculations
      const limitedHistory = history.slice(0, 10);
      localStorage.setItem(
        "repairCalculationHistory",
        JSON.stringify(limitedHistory),
      );

      // Save repair type separately for easy access
      localStorage.setItem("selectedRepairType", repairTypeId);

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const getRepairTypeName = (typeId: string) => {
    const types: Record<string, string> = {
      standard: "Стандартный ремонт",
      premium: "Премиум ремонт",
      luxury: "Люкс ремонт",
      economy: "Эконом ремонт",
    };
    return types[typeId] || "Стандартный ремонт";
  };

  const handleDownloadEstimate = () => {
    if (!selectedStyleData || !area) return;

    const estimate = {
      title: "Смета на ремонт",
      date: new Date().toLocaleDateString("ru-RU"),
      area: `${area} м²`,
      style: selectedStyleData.name,
      pricePerSqm: selectedStyleData.pricePerSqm.toLocaleString("ru-RU"),
      totalCost: totalCost.toLocaleString("ru-RU"),
      estimatedDays,
      features: selectedStyleData.features,
    };

    const blob = new Blob([JSON.stringify(estimate, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `смета-ремонт-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30 py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-200/20 to-cyan-200/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto text-center mb-12 md:mb-16 relative z-10"
      >
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl mb-8 relative group"
        >
          <Home className="w-12 h-12 text-white" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
        </motion.div>

        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
          <span className="text-sm font-semibold text-gradient bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Онлайн калькулятор 2024
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="relative inline-block">
            <span className="relative z-10">Рассчитайте стоимость</span>
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-lg"></div>
          </span>
          <br />
          <span className="text-gradient bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            ремонта мечты
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          Введите площадь, выберите стиль и получите точную смету за 2 минуты
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span>Точный расчет</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span>2 минуты</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-purple-500 mr-2" />
            <span>Гарантия 3 года</span>
          </div>
        </div>
      </motion.div>

      {/* Main Calculator */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Area Card */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>

              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-8 mx-auto shadow-lg group-hover:shadow-xl"
              >
                <Ruler className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center relative">
                Площадь помещения
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </h2>

              <div className="relative mb-8">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (parseFloat(value) >= 0 && parseFloat(value) <= 1000)
                    ) {
                      setArea(value);
                    }
                  }}
                  placeholder="0"
                  className="w-full px-8 py-6 text-4xl font-bold rounded-2xl border-2 border-gray-300 
                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 
                           outline-none transition-all duration-300 bg-gradient-to-b from-gray-50 to-white
                           text-center text-gray-900 placeholder-gray-400 shadow-inner"
                  min="0"
                  max="1000"
                  step="0.1"
                />
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-xl">
                  м²
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[20, 40, 60, 80, 100, 150].map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setArea(size.toString())}
                    className={`py-3 rounded-xl font-semibold transition-all duration-300 ${
                      area === size.toString()
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-gradient-to-b from-gray-100 to-white text-gray-700 hover:from-gray-200 hover:to-gray-100 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {size} м²
                  </motion.button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl border border-gray-200/50 hover:border-blue-200 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Home className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-600">Типовые комнаты:</span>
                  </div>
                  <span className="font-bold text-gray-900">15-25 м²</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl border border-gray-200/50 hover:border-orange-200 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <Home className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-600">Двухкомнатная:</span>
                  </div>
                  <span className="font-bold text-gray-900">40-60 м²</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl border border-gray-200/50 hover:border-purple-200 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Home className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-600">Квартира-студия:</span>
                  </div>
                  <span className="font-bold text-gray-900">25-40 м²</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Styles Selection */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-x-32 -translate-y-32"></div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-8 mx-auto shadow-lg relative z-10"
              >
                <Paintbrush className="w-10 h-10 text-white" />
              </motion.div>

              <div className="text-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Выберите стиль ремонта
                </h2>
                <p className="text-gray-600">Нажмите на понравившийся стиль</p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 gap-6 relative z-10"
              >
                {repairStyles.map((style) => (
                  <motion.div
                    key={style.id}
                    variants={fadeIn}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-500 group
                              ${
                                selectedStyle === style.id
                                  ? "border-blue-500 shadow-2xl ring-4 ring-blue-200/50"
                                  : "border-gray-200/50 hover:border-gray-300 hover:shadow-xl"
                              }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`http://157.180.29.248:8070/swagger/images/${style.image}`}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-8 h-8 rounded-full border-2 ${selectedStyle === style.id ? "bg-blue-500 border-blue-500 shadow-lg" : "bg-white/30 border-white/50 backdrop-blur-sm"} flex items-center justify-center transition-all duration-300`}
                        >
                          {selectedStyle === style.id && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white font-bold text-xl drop-shadow-lg">
                          {style.name}
                        </span>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 mr-1" />
                          <span className="text-white/90 text-sm">
                            Популярный выбор
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {style.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            {style.pricePerSqm.toLocaleString("ru-RU")} сом/м²
                          </span>
                          <div className="text-xs text-gray-500 mt-1">от</div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-2" />×
                          {style.timeMultiplier} времени
                        </div>
                      </div>

                      <div className="space-y-2">
                        {style.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-3">
                              <CheckCircle className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center mt-10 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculate}
                  disabled={!area || !selectedStyle}
                  className={`relative px-12 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 overflow-hidden group
                            ${
                              !area || !selectedStyle
                                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-2xl hover:from-orange-600 hover:to-red-600"
                            }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Рассчитать стоимость
                    <Zap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -right-2 -top-2 bg-white text-orange-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                </motion.button>

                {(!area || !selectedStyle) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 text-sm mt-4 flex items-center justify-center"
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                    {!area
                      ? "Введите площадь помещения"
                      : "Выберите стиль ремонта"}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && selectedStyleData && (
            <motion.section
              id="results"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="mt-12 md:mt-16"
            >
              <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl shadow-3xl overflow-hidden border border-white/30 relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400"></div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                  <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Ваша персональная смета
                      </h2>
                      <p className="text-blue-100/90 text-lg">
                        Расчет основан на выбранных параметрах
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <Award className="w-8 h-8" />
                      <Shield className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <div className="grid md:grid-cols-4 gap-6 mb-10">
                    {[
                      {
                        label: "Площадь",
                        value: `${area} м²`,
                        icon: <Ruler className="w-6 h-6" />,
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        label: "Стиль",
                        value: selectedStyleData.name,
                        icon: <Paintbrush className="w-6 h-6" />,
                        color: "from-orange-500 to-red-500",
                      },
                      {
                        label: "Срок",
                        value: `${estimatedDays} дней`,
                        icon: <Clock className="w-6 h-6" />,
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        label: "Тип ремонта",
                        value: getRepairTypeName(
                          localStorage.getItem("selectedRepairType") ||
                            "standard",
                        ),
                        icon: <Shield className="w-6 h-6" />,
                        color: "from-green-500 to-emerald-500",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                      >
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                        >
                          <div className="text-white">{item.icon}</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 font-medium">
                          {item.label}
                        </p>
                        <p className="text-xl font-bold text-gray-900 truncate">
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 border border-orange-200 rounded-3xl p-8 mb-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-orange-500/10 to-red-500/10 rounded-full -translate-y-24 translate-x-24"></div>

                    <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                      <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Общая стоимость ремонта
                        </h3>
                        <p className="text-gray-600 max-w-md">
                          Включая все материалы, работу мастеров, доставку и
                          уборку
                        </p>
                      </div>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                        className="text-center"
                      >
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          {totalCost.toLocaleString("ru-RU")} сом.
                        </div>
                        <div className="flex items-center justify-center mt-3">
                          <div className="text-sm text-gray-500 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                            ≈{" "}
                            {(
                              totalCost / parseFloat(area || "1")
                            ).toLocaleString("ru-RU")}{" "}
                            сом/м²
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                        Что входит в стоимость:
                      </h3>
                      <div className="space-y-4">
                        {[
                          "Все строительные материалы и расходники",
                          "Работа профессиональной бригады мастеров",
                          "Доставка материалов на объект",
                          "Вывоз строительного мусора",
                          "Черновые и чистовые работы",
                          "Финальная уборка помещения",
                          "Технический надзор",
                          "Гарантия 3 года",
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center p-4 bg-gradient-to-r from-gray-50/50 to-white rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white transition-all duration-300 group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-gray-700 font-medium">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Sparkles className="w-6 h-6 text-blue-500 mr-3" />
                        Преимущества:
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Фиксированная цена",
                            desc: "Без скрытых платежей",
                          },
                          {
                            title: "Опытные мастера",
                            desc: "Более 10 лет опыта",
                          },
                          {
                            title: "Строгий контроль",
                            desc: "Поэтапная приемка работ",
                          },
                          {
                            title: "Экологичные материалы",
                            desc: "Безопасно для здоровья",
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-white/80 rounded-xl hover:bg-white transition-colors"
                          >
                            <div className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
                    >
                      <Link
                        href={"/financing"}
                        className="flex items-center justify-center w-full h-full"
                      >
                        <span className="relative z-10 flex items-center">
                          Начать оплату
                          <Zap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </Link>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadEstimate}
                      className="flex-1 bg-white text-gray-800 border-2 border-gray-300 py-5 rounded-2xl font-bold hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Скачать смету
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
                    >
                      Заказать бесплатный замер
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
