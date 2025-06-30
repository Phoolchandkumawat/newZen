
import { motion } from "framer-motion";
import { Clock, CheckSquare, DollarSign, ArrowRight, Calendar, Flag, Users, Tag, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        <div 
          className="absolute inset-0 -z-10 bg-[#0A0A0A]"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <CheckSquare className="w-4 h-4 inline-block mr-2" />
            Organize your life and work
          </span>
        </motion.div>
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words="Capture tasks at the" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="speed of thought" />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left"
          >
            Stay organized and focused with our powerful todolist. Plan with confidence, 
            simplify your planning, and organize your teamwork.
            <span className="text-white block mt-2">Your productivity starts here.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/tasks">
              <Button size="lg" className="button-gradient w-full sm:w-auto">
                Start organizing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glass w-full sm:w-auto">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Features Grid */}
      <section className="container px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for productivity
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools designed to help you manage tasks, time, and teamwork efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* TodoList Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass glass-hover rounded-xl p-8 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart TodoList</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Capture tasks instantly, organize with projects, set priorities, and track progress with our intelligent task manager.
            </p>
            <Link to="/tasks">
              <Button className="w-full button-gradient group-hover:opacity-90 transition-opacity">
                Open TodoList
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* World Clock Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass glass-hover rounded-xl p-8 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">World Clock</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Keep track of multiple time zones and never miss important deadlines across the globe.
            </p>
            <Link to="/world-clock">
              <Button className="w-full button-gradient group-hover:opacity-90 transition-opacity">
                Open World Clock
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Currency Converter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass glass-hover rounded-xl p-8 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Currency Converter</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Convert currencies in real-time for global business decisions and travel planning.
            </p>
            <Link to="/currency">
              <Button className="w-full button-gradient group-hover:opacity-90 transition-opacity">
                Open Currency Converter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TodoList Features Section */}
      <section className="container px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful todolist features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay organized and boost your productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center glass rounded-lg p-6"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quick Capture</h3>
            <p className="text-sm text-muted-foreground">
              Add tasks instantly with natural language processing and smart parsing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center glass rounded-lg p-6"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Flag className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Smart Priorities</h3>
            <p className="text-sm text-muted-foreground">
              Set priorities and let our AI help you focus on what matters most
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center glass rounded-lg p-6"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Due Dates</h3>
            <p className="text-sm text-muted-foreground">
              Never miss a deadline with smart reminders and calendar integration
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center glass rounded-lg p-6"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Team Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Share projects and collaborate with your team in real-time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="container px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Task Organization</h3>
            <p className="text-muted-foreground">
              Organize tasks with projects, labels, and filters for maximum productivity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time Management</h3>
            <p className="text-muted-foreground">
              Track time across multiple zones and schedule tasks efficiently
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Features</h3>
            <p className="text-muted-foreground">
              AI-powered suggestions and automation to streamline your workflow
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
