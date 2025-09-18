import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

const SIDEBAR_WIDTH = 180;

const problems = [
  {
    id: "P001",
    title: "Water Damage in North Wall",
    description:
      "Water leakage has damaged the north-facing wall on the ground floor. Moisture levels exceed safe limits; repair is required to prevent structural weakening and mold growth.",
    priority: "High",
    progress: 75,
    photos: [
      "https://images.unsplash.com/photo-1618220169273-3f66fbb65d5d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad1?w=800&q=80&auto=format&fit=crop",
    ],
    todos: [
      { id: 1, text: "Assess water damage extent", completed: true },
      { id: 2, text: "Remove damaged drywall", completed: true },
      { id: 3, text: "Fix plumbing leak", completed: true },
      { id: 4, text: "Install new drywall", completed: false },
      { id: 5, text: "Paint and finish", completed: false },
    ],
    updates: [
      {
        id: 1,
        text: "Initial damage assessment complete. Plumbing leak identified.",
        date: "2025-01-15",
      },
      {
        id: 2,
        text: "Drywall removal finished. Beginning repairs tomorrow.",
        date: "2025-01-16",
      },
    ],
    aiRecommendations: [
      {
        id: 1,
        title: "Optimize Repair Sequence",
        description:
          "Install a moisture barrier before new drywall and allow full drying time to reduce recurrence.",
        priority: "High",
        estimatedTime: "30 minutes",
      },
      {
        id: 2,
        title: "Use Mold-Resistant Materials",
        description:
          "Use mold-resistant drywall and primers in damp-prone areas to increase resilience.",
        priority: "Medium",
        estimatedTime: "45 minutes",
      },
    ],
  },
  {
    id: "P002",
    title: "HVAC System Malfunction",
    description:
      "Central HVAC unit producing uneven cooling; worn filters and faulty thermostat detected.",
    priority: "Medium",
    progress: 30,
    photos: [
      "https://images.unsplash.com/photo-1505691723518-36a5a0f5c86a?w=800&q=80&auto=format&fit=crop",
    ],
    todos: [
      { id: 1, text: "Inspect HVAC system", completed: true },
      { id: 2, text: "Order replacement parts", completed: false },
    ],
    updates: [
      {
        id: 1,
        text: "HVAC inspection revealed worn filters and faulty thermostat.",
        date: "2025-01-14",
      },
    ],
    aiRecommendations: [],
  },
];

function ProblemSidebar({ problems, selectedId, onSelect, onClose }) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarHeaderRow}>
        <Text style={styles.sidebarHeader}>Problems</Text>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
        >
          <Ionicons name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {problems.map((problem) => (
          <TouchableOpacity
            key={problem.id}
            style={[
              styles.sidebarItem,
              selectedId === problem.id && styles.sidebarItemActive,
            ]}
            onPress={() => onSelect(problem.id)}
          >
            <Text style={styles.sidebarItemId}>{problem.id}</Text>
            <Text style={styles.sidebarItemTitle} numberOfLines={2}>
              {problem.title}
            </Text>
            <View
              style={[
                styles.badge,
                problem.priority === "High"
                  ? styles.badgeHigh
                  : problem.priority === "Medium"
                  ? styles.badgeMedium
                  : styles.badgeLow,
              ]}
            >
              <Text style={styles.badgeText}>{problem.priority}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function AISuggestions({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>AI Suggestions</Text>
      {recommendations.map((rec) => (
        <View key={rec.id} style={styles.suggestionBox}>
          <View style={styles.suggestionHeader}>
            <Text style={styles.suggestionTitle}>{rec.title}</Text>
            <View
              style={[
                rec.priority === "High"
                  ? styles.badgeHigh
                  : rec.priority === "Medium"
                  ? styles.badgeMedium
                  : styles.badgeLow,
                styles.suggestionBadge,
              ]}
            >
              <Text style={styles.badgeText}>{rec.priority}</Text>
            </View>
          </View>
          <Text style={styles.suggestionDesc}>{rec.description}</Text>
          <View style={styles.suggestionFooter}>
            <Text style={styles.muted}>Est. {rec.estimatedTime}</Text>
            <TouchableOpacity style={styles.suggestionBtn}>
              <Text style={styles.suggestionBtnText}>Add to Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

function ProblemDetail({ problem }) {
  const [newUpdate, setNewUpdate] = useState("");
  const [todos, setTodos] = useState(problem.todos || []);
  const [updates, setUpdates] = useState(problem.updates || []);
  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (todoId) => {
    setTodos(
      todos.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const todo = { id: todos.length + 1, text: newTodo.trim(), completed: false };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const addUpdate = () => {
    if (!newUpdate.trim()) return;
    const u = {
      id: updates.length + 1,
      text: newUpdate.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    setUpdates([...updates, u]);
    setNewUpdate("");
  };

  return (
    <ScrollView style={styles.detail} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Top Info Boxes */}
      <View style={styles.topBoxesRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxLabel}>Title</Text>
          <Text style={styles.infoBoxText}>{problem.title}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxLabel}>ID</Text>
          <Text style={styles.infoBoxText}>{problem.id}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxLabel}>Priority</Text>
          <View
            style={[
              problem.priority === "High"
                ? styles.badgeHigh
                : problem.priority === "Medium"
                ? styles.badgeMedium
                : styles.badgeLow,
              styles.badge,
            ]}
          >
            <Text style={styles.badgeText}>{problem.priority}</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.desc}>{problem.description}</Text>
      </View>

      {/* Photos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progress Photos</Text>
        <FlatList
          horizontal
          data={problem.photos || []}
          keyExtractor={(item, idx) => String(idx)}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.photoThumb} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      </View>

      {/* Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progress</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Completion</Text>
          <Text>{problem.progress ?? 0}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${problem.progress}%` }]} />
        </View>
      </View>

      {/* To-Do List */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>To-Do List</Text>
        {todos.map((todo) => (
          <TouchableOpacity
            key={todo.id}
            style={styles.todoRow}
            onPress={() => toggleTodo(todo.id)}
          >
            <Feather
              name={todo.completed ? "check-square" : "square"}
              size={20}
              color={todo.completed ? "green" : "#444"}
            />
            <Text style={[styles.todoText, todo.completed && styles.todoCompleted]}>
              {todo.text}
            </Text>
          </TouchableOpacity>
        ))}
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add new task..."
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Updates */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progress Updates</Text>
        {updates.map((u, idx) => (
          <View key={u.id} style={styles.timelineItem}>
            <View style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text>{u.text}</Text>
                <Text style={styles.muted}>{u.date}</Text>
              </View>
            </View>
            {idx !== updates.length - 1 && <View style={styles.timelineLine} />}
          </View>
        ))}
        <TextInput
          style={styles.input}
          value={newUpdate}
          onChangeText={setNewUpdate}
          placeholder="Post new update..."
        />
        <TouchableOpacity style={styles.button} onPress={addUpdate}>
          <Text style={styles.buttonText}>Post Update</Text>
        </TouchableOpacity>
      </View>

      {/* AI Suggestions */}
      <AISuggestions recommendations={problem.aiRecommendations} />
    </ScrollView>
  );
}

export default function SpecificIssueEmployee() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentProblem = problems.find((p) => p.id === selectedProblem) || problems[0];

  const handleSelect = (id) => {
    setSelectedProblem(id);
    setSidebarOpen(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {sidebarOpen && (
        <View style={[styles.sidebarWrapper, { width: SIDEBAR_WIDTH }]}>
          <ProblemSidebar
            problems={problems}
            selectedId={selectedProblem}
            onSelect={handleSelect}
            onClose={() => setSidebarOpen(false)}
          />
        </View>
      )}

      <View
        style={[
          styles.contentWrapper,
          { marginLeft: sidebarOpen ? SIDEBAR_WIDTH : 0, paddingTop: 12 },
        ]}
      >
        <ProblemDetail problem={currentProblem} />
      </View>

      {sidebarOpen && (
        <TouchableOpacity
          style={[styles.overlay, { left: SIDEBAR_WIDTH }]}
          activeOpacity={1}
          onPress={() => setSidebarOpen(false)}
        />
      )}

      <TouchableOpacity
        onPress={() => setSidebarOpen((s) => !s)}
        style={[
          styles.toggleButton,
          { left: sidebarOpen ? SIDEBAR_WIDTH + 10 : 10 },
        ]}
      >
        <FontAwesome name={sidebarOpen ? "close" : "bars"} size={20} color="#111" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },

  sidebarWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#e6e6e6",
    zIndex: 50,
    elevation: 8,
  },
  sidebar: { flex: 1, padding: 10, backgroundColor: "#f9fafb" },
  sidebarHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sidebarHeader: { fontSize: 16, fontWeight: "700" },
  sidebarItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    elevation: 2,
  },
  sidebarItemActive: { backgroundColor: "#e6f0ff" },
  sidebarItemId: { fontWeight: "700" },
  sidebarItemTitle: { color: "#333", marginTop: 6 },

  contentWrapper: { flex: 1 },

  toggleButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 52 : 22,
    zIndex: 100,
    elevation: 100,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.14)",
    zIndex: 60,
  },

  topBoxesRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  infoBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
  },
  infoBoxLabel: { fontSize: 12, color: "#666" },
  infoBoxText: { fontWeight: "700", fontSize: 14, marginTop: 2 },

  card: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginTop: 14, elevation: 3, borderWidth: 1, borderColor: "#eef2f6" },
  cardTitle: { fontWeight: "700", marginBottom: 8, fontSize: 15 },
  desc: { fontSize: 14, lineHeight: 20, color: "#333" },
  photoThumb: { width: 140, height: 96, borderRadius: 8, marginRight: 10, backgroundColor: "#eaeaea" },

  progressBar: { height: 8, backgroundColor: "#eef2f7", borderRadius: 6, overflow: "hidden", marginTop: 8 },
  progressFill: { height: 8, backgroundColor: "#2563eb" },

  todoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  todoText: { marginLeft: 10, fontSize: 14 },
  todoCompleted: { textDecorationLine: "line-through", color: "#888" },

  input: { borderWidth: 1, borderColor: "#e6e6e6", borderRadius: 8, padding: 10, marginTop: 8, backgroundColor: "#fafafa" },
  button: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, marginTop: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },

  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: "flex-start" },
  badgeHigh: { backgroundColor: "#dc2626" },
  badgeMedium: { backgroundColor: "#facc15" },
  badgeLow: { backgroundColor: "#4ade80" },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 11 },

  suggestionBox: { padding: 12, borderRadius: 8, backgroundColor: "#f7fbff", marginBottom: 12, borderWidth: 1, borderColor: "#e6f0ff" },
  suggestionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  suggestionTitle: { fontWeight: "700", fontSize: 14 },
  suggestionDesc: { marginTop: 8, color: "#333" },
  suggestionFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  suggestionBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1, borderColor: "#2563eb" },
  suggestionBtnText: { color: "#2563eb", fontWeight: "700" },

  timelineItem: { marginBottom: 10, paddingLeft: 12 },
  timelineRow: { flexDirection: "row", alignItems: "flex-start" },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#2563eb", marginTop: 4 },
  timelineContent: { marginLeft: 10, flex: 1 },
  timelineLine: { width: 2, height: 20, backgroundColor: "#2563eb", marginLeft: 4 },

  muted: { fontSize: 12, color: "#888", marginTop: 2 },
});