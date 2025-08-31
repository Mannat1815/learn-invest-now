import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Calendar, Linkedin, Github, Twitter } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "January 2024",
    avatar: "https://i.pravatar.cc/150?img=12",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
  });

  const [editing, setEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    console.log("Updated user:", user);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-transparent rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white flex items-center gap-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-2 border-white shadow-md"
            />
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
          </div>

          <CardContent className="p-6">
            {editing ? (
              <form onSubmit={handleSave} className="space-y-6 animate-fadeIn">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <Input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <Input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Save Changes
                </Button>
              </form>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-indigo-500" />
                  <span className="text-lg font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-500" />
                  <span className="text-lg">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <span className="text-lg">Joined {user.joinDate}</span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-2">
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={user.github} target="_blank" rel="noreferrer" className="hover:text-gray-800">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={user.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>

                <Button
                  onClick={() => setEditing(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
