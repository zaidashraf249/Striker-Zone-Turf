import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    date: { type: Date, required: true, unique: true },
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => `BKG-${Date.now()}`,
    },
    isBookingConfirmed: { type: Boolean, default: false },
    isPaymentDone: { type: Boolean, default: false },
    paymentMethod: { type: String, enum: ["upi", "cash"], default: "upi" },
    amountPaid: { type: Number, default: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
