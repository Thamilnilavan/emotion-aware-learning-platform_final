'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import teacherAPI from '@/services/api/teacher';

function NotificationsContent(){const [items,setItems]=useState<Array<Record<string,any>>>([]);const [loading,setLoading]=useState(true);useEffect(()=>{teacherAPI.getNotifications().then(result=>setItems(result.notifications||[])).catch(()=>toast.error('Failed to load notifications')).finally(()=>setLoading(false));},[]);if(loading)return <div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="lg"/></div>;return <div className="min-h-screen bg-background pb-20 lg:pb-0"><Navbar/><div className="flex"><Sidebar/><main className="flex-1 p-4 md:p-8"><div className="mb-7 flex items-center gap-3"><Bell className="h-8 w-8 text-primary"/><div><h1 className="text-2xl font-extrabold text-heading">Teacher Notifications</h1><p className="text-sm text-body">Engagement alerts and platform announcements.</p></div></div><div className="space-y-3">{items.map(item=><article key={item._id} className="glass-card p-5"><div className="flex justify-between gap-3"><h2 className="font-semibold text-heading">{item.title||item.type}</h2><time className="text-xs text-body">{new Date(item.createdAt).toLocaleString()}</time></div><p className="mt-2 text-sm text-body">{item.message}</p></article>)}{items.length===0&&<div className="glass-card p-10 text-center text-body">No notifications yet.</div>}</div></main></div></div>;}
export default function Page(){return <ProtectedRoute role="teacher"><NotificationsContent/></ProtectedRoute>;}
