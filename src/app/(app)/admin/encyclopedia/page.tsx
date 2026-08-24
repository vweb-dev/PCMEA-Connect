
"use client";

import { useState } from "react";
import { encyclopediaData } from "@/lib/data";
import type { RugEncyclopediaEntry } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

export default function AdminEncyclopediaPage() {
  const [entries, setEntries] = useState(encyclopediaData);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<RugEncyclopediaEntry | null>(null);
  const router = useRouter();

  const handleEditClick = (entry: RugEncyclopediaEntry) => {
    router.push(`/admin/encyclopedia/edit/${entry.id}`);
  };

  const handleDeleteClick = (entry: RugEncyclopediaEntry) => {
    setEntryToDelete(entry);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (entryToDelete) {
      setEntries(entries.filter(e => e.id !== entryToDelete.id));
      setEntryToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Encyclopedia Management</h1>
            <p className="text-muted-foreground mt-2">Manage all entries in the Rug Encyclopedia.</p>
        </div>
        <Link href="/admin/encyclopedia/new">
            <Button>
                <PlusCircle className="mr-2" />
                Add New Entry
            </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Knot Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.origin}</TableCell>
                  <TableCell>{entry.characteristics.knot}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleEditClick(entry)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDeleteClick(entry)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the entry for "{entryToDelete?.name}".
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
