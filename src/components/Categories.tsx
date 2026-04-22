"use client";

import { motion } from "framer-motion";
import { 
  SpeakerWaveIcon, 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon, 
  ClockIcon, 
  CameraIcon,
  MicrophoneIcon
} from "@heroicons/react/24/outline";

const categories = [
  { name: "Audio", icon: SpeakerWaveIcon },
  { name: "Computing", icon: ComputerDesktopIcon },
  { name: "Mobile", icon: DevicePhoneMobileIcon },
  { name: "Wearables", icon: ClockIcon },
  { name: "Photography", icon: CameraIcon },
  { name: "Microphones", icon: MicrophoneIcon },
];

export default function Categories() {
  return (
    <section className="py-20 bg-black/20 backdrop-blur-sm border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center justify-center p-6 glass-card cursor-pointer hover:border-indigo-500/50 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <cat.icon className="w-8 h-8 text-foreground/80 group-hover:text-indigo-400 transition-colors" />
              </div>
              <span className="font-medium text-sm text-foreground/90 group-hover:text-white transition-colors">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
