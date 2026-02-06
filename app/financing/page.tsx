"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
  TrendingUp,
  CheckCircle,
  Shield,
  Percent,
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  User,
  Calculator,
  Banknote,
  Clock,
  FileText,
  ChevronRight,
  MapPin,
  Calendar as CalendarIcon,
  Hash,
  MessageSquare,
  Users,
} from "lucide-react";
import { axiosRequest } from "@/utils/axios";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut", // ✅ valid easing
    },
  },
};
interface SavedCalculation {
  area: string;
  selectedStyleId: string;
  selectedStyleName: string;
  totalCost: number;
  estimatedDays: number;
  timestamp: number;
}

interface OrderFormData {
  phone: string;
  service: number; // Always 1
  address: string;
  start_date: string;
  end_date: string;
  name?: string;
  email?: string;
  paymentMethod?: "full" | "installment";
  installmentMonths?: number;
  comments?: string; // Additional field for comments
}

// PaymentCard Component
interface PaymentCardProps {
  active: boolean;
  onClick: () => void;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  features?: string[];
  highlight?: boolean;
  popular?: boolean;
  savedCalculation?: SavedCalculation | null;
}

function PaymentCard({
  active,
  onClick,
  icon: Icon,
  title,
  subtitle,
  color,
  children,
  features,
  highlight,
  popular,
  savedCalculation,
}: PaymentCardProps) {
  const colorClasses = {
    orange: "from-orange-500 to-orange-600",
    blue: "from-blue-500 to-cyan-500",
    pink: "from-pink-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 ${
        active
          ? `ring-4 ring-${color}-500 shadow-2xl`
          : "shadow-lg hover:shadow-xl"
      }`}
    >
      {popular && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Популярный выбор
        </div>
      )}

      {savedCalculation && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium z-10">
          Из калькулятора
        </div>
      )}

      <div
        className={`bg-white p-6 md:p-8 ${active ? "border-2 border-transparent" : ""}`}
      >
        <div className="flex items-start mb-6">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} rounded-xl flex items-center justify-center mr-4`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>

        {savedCalculation && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">
              Ваш расчет из калькулятора:
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {savedCalculation.area} м² •{" "}
                {savedCalculation.selectedStyleName}
              </span>
              <span className="font-bold text-blue-600">
                {savedCalculation.totalCost.toLocaleString("ru-RU")} сом
              </span>
            </div>
          </div>
        )}

        {features && (
          <div className="mb-6 space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {children}

        {highlight && (
          <div className="mt-4 bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-xl">
            <div className="flex items-center">
              <Percent className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-orange-700">
                Лучшее предложение для экономии
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// InstallmentOption Component
interface InstallmentOptionProps {
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  selected: boolean;
  onClick: () => void;
  color: string;
  popular?: boolean;
}

function InstallmentOption({
  months,
  monthlyPayment,
  totalAmount,
  selected,
  onClick,
  color,
  popular,
}: InstallmentOptionProps) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 ${
        selected
          ? `ring-2 ring-${color}-500 bg-gradient-to-br from-white to-${color}-50`
          : "bg-white hover:bg-gray-50"
      } shadow-lg hover:shadow-xl`}
    >
      {popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
          Самый популярный
        </div>
      )}

      <div
        className={`w-16 h-16 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} rounded-xl flex items-center justify-center mx-auto mb-4`}
      >
        <Calendar className="w-8 h-8 text-white" />
      </div>

      <div className="text-4xl font-bold mb-2">{months}</div>
      <p className="text-gray-600 mb-4">месяцев</p>

      <div className="space-y-2">
        <div className="text-lg font-bold text-gray-900">
          {monthlyPayment.toLocaleString("ru-RU")} сом
        </div>
        <p className="text-sm text-gray-500">в месяц</p>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      <div className="text-sm text-gray-600">
        Общая сумма: {totalAmount.toLocaleString("ru-RU")} сом
      </div>
    </motion.div>
  );
}

// Main Component
export default function FinancingPage() {
  const [paymentMethod, setPaymentMethod] = useState<"full" | "installment">(
    "full",
  );
  const [selectedInstallment, setSelectedInstallment] = useState(12);
  const [formData, setFormData] = useState<OrderFormData>({
    phone: "",
    service: 1, // Always 1
    address: "",
    start_date: "",
    end_date: "",
    name: "",
    email: "",
    comments: "",
  });
  const [step, setStep] = useState(1);
  const [savedCalculation, setSavedCalculation] =
    useState<SavedCalculation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load saved calculation from localStorage on component mount
  useEffect(() => {
    const savedCalculationStr = localStorage.getItem("lastRepairCalculation");
    if (savedCalculationStr) {
      try {
        const calculation: SavedCalculation = JSON.parse(savedCalculationStr);
        setSavedCalculation(calculation);
      } catch (error) {
        console.error("Error parsing saved calculation:", error);
      }
    }
  }, []);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const startDate = today.toISOString().split("T")[0];
    const endDate = new Date(
      today.getTime() +
        (savedCalculation?.estimatedDays || 14) * 24 * 60 * 60 * 1000,
    )
      .toISOString()
      .split("T")[0];

    setFormData((prev) => ({
      ...prev,
      start_date: prev.start_date || startDate,
      end_date: prev.end_date || endDate,
    }));
  }, [savedCalculation]);

  const totalAmount = savedCalculation?.totalCost || 500000;

  const installmentOptions = [
    {
      months: 6,
      monthly: totalAmount / 6,
      discount: 0,
      color: "blue",
    },
    {
      months: 12,
      monthly: totalAmount / 12,
      discount: 0,
      color: "orange",
      popular: true,
    },
    {
      months: 24,
      monthly: totalAmount / 24,
      discount: 0,
      color: "purple",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare the order data according to API requirements
    const orderData = {
      phone: formData.phone,
      service: 1, // Always 1
      address: formData.address,
      start_date: formData.start_date,
      end_date: formData.end_date,
      // Only send the required fields
    };

    // Log the data being sent
    console.log("Submitting order data:", orderData);

    try {
      const response = await axiosRequest.post("/orders/", orderData);

      if (response.status === 201 || response.status === 200) {
        console.log("Order submitted successfully:", response.data);
        setStep(4); // Show success step

        // Save to localStorage history
        const orderHistoryStr = localStorage.getItem("orderHistory");
        const orderHistory = orderHistoryStr ? JSON.parse(orderHistoryStr) : [];
        orderHistory.unshift({
          ...orderData,
          order_id: response.data.id || Date.now(),
          timestamp: new Date().toISOString(),
          status: "pending",
          payment_method: paymentMethod,
          installment_months:
            paymentMethod === "installment" ? selectedInstallment : undefined,
          saved_calculation: savedCalculation,
        });
        localStorage.setItem(
          "orderHistory",
          JSON.stringify(orderHistory.slice(0, 10)),
        );
      }
    } catch (error: any) {
      console.error("Error submitting order:", error);

      // Show detailed error message
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        if (error.response.data) {
          // Parse Django validation errors
          const errorMessages = Object.entries(error.response.data)
            .map(
              ([field, messages]) =>
                `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
            )
            .join("\n");
          setSubmitError(`Ошибка валидации:\n${errorMessages}`);
        } else {
          setSubmitError(`Ошибка сервера: ${error.response.status}`);
        }
      } else if (error.request) {
        setSubmitError(
          "Нет ответа от сервера. Проверьте подключение к интернету.",
        );
      } else {
        setSubmitError(
          "Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateMonthlyPayment = () => {
    if (paymentMethod === "full") return 0;
    const option = installmentOptions.find(
      (opt) => opt.months === selectedInstallment,
    );
    return option ? Math.ceil(option.monthly) : 0;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Validate required fields
  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.phone.trim()) errors.push("Телефон обязателен");
    if (!formData.address.trim()) errors.push("Адрес обязателен");
    if (!formData.start_date) errors.push("Дата начала обязательна");
    if (!formData.end_date) errors.push("Дата окончания обязательна");

    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      if (end <= start)
        errors.push("Дата окончания должна быть позже даты начала");
    }

    return errors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-64 h-64 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-6 mx-auto">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {paymentMethod === "full"
                ? "Оплата ремонта"
                : "Финансирование ремонта"}{" "}
              <br />
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {paymentMethod === "full" ? "единовременно" : "в рассрочку"}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {paymentMethod === "full"
                ? "Оплатите всю сумму сразу и получите скидку 5%"
                : "Выберите удобный способ оплаты и получите рассрочку 0% без переплат"}
            </p>

            {savedCalculation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-3 rounded-xl"
              >
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Расчет из калькулятора:{" "}
                  <span className="font-bold">
                    {savedCalculation.totalCost.toLocaleString("ru-RU")} сом
                  </span>
                  <span className="text-xs text-gray-600 ml-2">
                    ({savedCalculation.area} м² •{" "}
                    {savedCalculation.selectedStyleName})
                  </span>
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Progress steps */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-6">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= stepNum
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div
                      className={`w-12 h-1 md:w-24 ${
                        step > stepNum
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 md:space-x-20 mt-4">
              <span
                className={`text-sm font-medium ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}
              >
                Способ оплаты
              </span>
              <span
                className={`text-sm font-medium ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}
              >
                {paymentMethod === "installment" ? "Срок" : "Информация"}
              </span>
              <span
                className={`text-sm font-medium ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}
              >
                Оформление
              </span>
              <span
                className={`text-sm font-medium ${step >= 4 ? "text-blue-600" : "text-gray-400"}`}
              >
                Готово
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Options - Always shown */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Выберите{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                способ оплаты
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {paymentMethod === "full"
                ? "Оплатите сразу и получите скидку"
                : "Разделите платеж на удобные части"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <PaymentCard
              active={paymentMethod === "full"}
              onClick={() => {
                setPaymentMethod("full");
                setStep(2);
              }}
              icon={CreditCard}
              title="Полная оплата"
              subtitle="Выгодная скидка 5%"
              color="orange"
              features={[
                "Мгновенная оплата всей суммы",
                "Экономия 5% от общей стоимости",
                "Приоритетное выполнение работ",
                "Дополнительные бонусы",
              ]}
              highlight
              savedCalculation={savedCalculation}
            >
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Общая стоимость:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalAmount.toLocaleString("ru-RU")} сом
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Ваша экономия:</span>
                    <span className="text-lg font-bold text-green-600">
                      - {(totalAmount * 0.05).toLocaleString("ru-RU")} сом
                    </span>
                  </div>
                  <div className="h-px bg-orange-200 my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">К оплате:</span>
                    <span className="text-2xl md:text-3xl font-bold text-orange-600">
                      {(totalAmount * 0.95).toLocaleString("ru-RU")} сом
                    </span>
                  </div>
                </div>
              </div>
            </PaymentCard>

            <PaymentCard
              active={paymentMethod === "installment"}
              onClick={() => {
                setPaymentMethod("installment");
                setStep(2);
              }}
              icon={TrendingUp}
              title="Рассрочка 0%"
              subtitle="Без процентов и скрытых платежей"
              color="blue"
              features={[
                "Без первоначального взноса",
                "Официальный договор",
                "Гибкие сроки: от 6 до 24 месяцев",
                "Одобрение за 15 минут",
              ]}
              popular
              savedCalculation={savedCalculation}
            >
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Общая сумма:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalAmount.toLocaleString("ru-RU")} сом
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Ежемесячный платеж:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {calculateMonthlyPayment().toLocaleString("ru-RU")} сом
                    </span>
                  </div>
                  <div className="h-px bg-blue-200 my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Переплата:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      0 сом
                    </span>
                  </div>
                </div>
              </div>
            </PaymentCard>
          </div>
        </div>
      </section>

      {/* Installment Options - Only shown for installment */}
      {paymentMethod === "installment" && step >= 2 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 md:py-20 relative z-10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full mb-4">
                <Percent className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  Рассрочка 0%
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Выберите{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  срок рассрочки
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Оптимальные условия для вашего бюджета
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {installmentOptions.map((opt) => (
                <InstallmentOption
                  key={opt.months}
                  months={opt.months}
                  monthlyPayment={Math.ceil(opt.monthly)}
                  totalAmount={totalAmount}
                  selected={selectedInstallment === opt.months}
                  onClick={() => {
                    setSelectedInstallment(opt.months);
                    setStep(3);
                  }}
                  color={opt.color}
                  popular={opt.popular}
                />
              ))}
            </div>

            {/* Summary Card */}
            <motion.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ваш выбор</h3>
                  <p className="text-gray-300">
                    Рассрочка на {selectedInstallment} месяцев
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ежемесячный платеж</p>
                  <p className="text-3xl font-bold">
                    {calculateMonthlyPayment().toLocaleString("ru-RU")} сом
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    Продолжить оформление
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Full Payment Info - Only shown for full payment */}
      {paymentMethod === "full" && step >= 2 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 md:py-20 relative z-10"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-2 rounded-full mb-4">
                <CreditCard className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">
                  Полная оплата со скидкой
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Преимущества{" "}
                <span className="text-gradient bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  полной оплаты
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Оплатите сразу и получите дополнительные выгоды
              </p>
            </motion.div>

            <motion.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Ваша экономия
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <span className="text-gray-700">Исходная сумма:</span>
                      <span className="font-semibold">
                        {totalAmount.toLocaleString("ru-RU")} сом
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                      <span className="text-green-700">Скидка 5%:</span>
                      <span className="font-bold text-green-600">
                        - {(totalAmount * 0.05).toLocaleString("ru-RU")} сом
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                      <span className="text-orange-700 font-medium">
                        Итого к оплате:
                      </span>
                      <span className="text-2xl font-bold text-orange-600">
                        {(totalAmount * 0.95).toLocaleString("ru-RU")} сом
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Дополнительные бонусы
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Приоритет в графике работ",
                      "Бесплатный вывоз мусора",
                      "Гарантия 3 года вместо 2",
                      "Бесплатные консультации дизайнера",
                    ].map((bonus, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{bonus}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Перейти к оформлению
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Application Form - Show for both payment methods when step >= 3 */}
      {step >= 3 && (
        <section className="py-12 md:py-20 relative z-10">
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              <div
                className={`p-6 md:p-8 text-white ${paymentMethod === "full" ? "bg-gradient-to-r from-orange-600 to-orange-500" : "bg-gradient-to-r from-blue-600 to-cyan-500"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Оформление заказа
                    </h2>
                    <p className="text-white/90 opacity-90">
                      Заполните 4 обязательных поля для оформления{" "}
                      {paymentMethod === "full" ? "оплаты" : "рассрочки"}
                    </p>
                  </div>
                  <Users className="w-10 h-10 opacity-80" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Пожалуйста, заполните все обязательные поля для оформления
                      заказа. После отправки наш менеджер свяжется с вами для
                      подтверждения.
                    </p>
                  </div>
                </div>

                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl whitespace-pre-line">
                      {submitError}
                    </div>
                  )}

                  {/* Service ID - Always 1 (hidden) */}
                  <input type="hidden" name="service" value="1" />

                  {/* Required Fields Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone (required) */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Телефон <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+996 555 123 456"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Пример: +996 555 123 456
                      </p>
                    </div>

                    {/* Address (required) */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        Адрес ремонта{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="г. Бишкек, ул. Примерная, д. 123"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Укажите полный адрес
                      </p>
                    </div>

                    {/* Start Date (required) */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Дата начала работ{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={formData.start_date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            start_date: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <p className="text-xs text-gray-500">
                        Когда планируете начать ремонт?
                      </p>
                    </div>

                    {/* End Date (required) */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Предполагаемая дата завершения{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={formData.end_date}
                        onChange={(e) =>
                          setFormData({ ...formData, end_date: e.target.value })
                        }
                        min={
                          formData.start_date ||
                          new Date().toISOString().split("T")[0]
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Когда планируете завершить ремонт?
                      </p>
                    </div>
                  </div>

                  {/* Optional Fields Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
                    {/* Name (optional) */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 mr-2" />
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={formData.name || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Для обращения к вам
                      </p>
                    </div>

                    {/* Email (optional) */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={formData.email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Для отправки документов
                      </p>
                    </div>
                  </div>

                  {/* Comments (optional) */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Комментарии к заказу
                    </label>
                    <textarea
                      placeholder="Дополнительные пожелания, особенности помещения и т.д."
                      rows={3}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                      value={formData.comments || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, comments: e.target.value })
                      }
                    />
                    <p className="text-xs text-gray-500">
                      Любая дополнительная информация
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Сводка по заказу
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Способ оплаты:</span>
                        <span className="font-semibold">
                          {paymentMethod === "full"
                            ? "Полная оплата"
                            : "Рассрочка"}
                        </span>
                      </div>
                      {paymentMethod === "installment" && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Срок рассрочки:</span>
                          <span className="font-semibold">
                            {selectedInstallment} месяцев
                          </span>
                        </div>
                      )}
                      {savedCalculation && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              Стиль ремонта:
                            </span>
                            <span className="font-semibold">
                              {savedCalculation.selectedStyleName}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Площадь:</span>
                            <span className="font-semibold">
                              {savedCalculation.area} м²
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Сумма:</span>
                        <span className="font-semibold">
                          {totalAmount.toLocaleString("ru-RU")} сом
                        </span>
                      </div>
                      {paymentMethod === "full" && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Скидка 5%:</span>
                          <span className="font-bold text-green-600">
                            - {(totalAmount * 0.05).toLocaleString("ru-RU")} сом
                          </span>
                        </div>
                      )}
                      <div className="h-px bg-gray-300 my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-bold">
                          {paymentMethod === "full"
                            ? "Итого к оплате:"
                            : "Ежемесячный платеж:"}
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          {paymentMethod === "full"
                            ? (totalAmount * 0.95).toLocaleString("ru-RU")
                            : calculateMonthlyPayment().toLocaleString(
                                "ru-RU",
                              )}{" "}
                          сом
                          {paymentMethod === "installment" && (
                            <span className="text-sm font-normal"> / мес</span>
                          )}
                        </span>
                      </div>
                      <div className="h-px bg-gray-300 my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Дата начала:</span>
                        <span className="font-semibold">
                          {formatDate(formData.start_date)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Дата завершения:</span>
                        <span className="font-semibold">
                          {formatDate(formData.end_date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${paymentMethod === "full" ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-gradient-to-r from-blue-500 to-cyan-500"} text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Отправка заказа...
                        </>
                      ) : (
                        <>
                          Отправить заявку на{" "}
                          {paymentMethod === "full" ? "оплату" : "рассрочку"}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>

                    <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Что будет после отправки:
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>
                            • Наш менеджер свяжется с вами в течение 15 минут
                          </li>
                          <li>• Вы получите подтверждение заказа по SMS</li>
                          <li>• Мы согласуем детали оплаты и сроки работ</li>
                          <li>• Заключим официальный договор</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Success Modal */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Заявка отправлена успешно!
            </h3>
            <p className="text-gray-600 mb-4">
              Наш менеджер свяжется с вами в течение 15 минут для подтверждения
              заказа и обсуждения деталей{" "}
              {paymentMethod === "full" ? "оплаты" : "рассрочки"}.
            </p>
            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left space-y-2">
              <p className="text-sm text-gray-600 font-medium mb-2">
                Данные вашего заказа:
              </p>
              <p className="text-sm">
                <span className="font-medium">Телефон:</span> {formData.phone}
              </p>
              <p className="text-sm">
                <span className="font-medium">Адрес:</span> {formData.address}
              </p>
              <p className="text-sm">
                <span className="font-medium">Дата начала:</span>{" "}
                {formatDate(formData.start_date)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Дата завершения:</span>{" "}
                {formatDate(formData.end_date)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Тип оплаты:</span>{" "}
                {paymentMethod === "full" ? "Полная оплата" : "Рассрочка"}
              </p>
              {savedCalculation && (
                <p className="text-sm">
                  <span className="font-medium">Сумма:</span>{" "}
                  {savedCalculation.totalCost.toLocaleString("ru-RU")} сом
                </p>
              )}
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    phone: "",
                    service: 1,
                    address: "",
                    start_date: "",
                    end_date: "",
                    name: "",
                    email: "",
                    comments: "",
                  });
                  window.location.href = "/home";
                }}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Вернуться на главную
              </button>
              <button
                onClick={() => {
                  // Reset form for new order
                  setStep(1);
                  setFormData({
                    phone: "",
                    service: 1,
                    address: "",
                    start_date: "",
                    end_date: "",
                    name: "",
                    email: "",
                    comments: "",
                  });
                  setPaymentMethod("full");
                  setSelectedInstallment(12);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Оформить новый заказ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
