
"use client";

import { useState, useMemo } from "react";
import { memberData } from "@/lib/data";
import type { Member } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


type MemberRanking = {
  id: string;
  isTop: boolean;
  rank?: number;
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState(memberData);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const initialRankings = members.map(m => ({ id: m.id, isTop: false, rank: undefined }));
  const [memberRankings, setMemberRankings] = useState<MemberRanking[]>(initialRankings);

  const filteredMembers = useMemo(() => {
    if (!searchTerm) {
      return members;
    }
    return members.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  const handleTopMemberChange = (memberId: string, checked: boolean) => {
    const topMembersCount = memberRankings.filter(r => r.isTop).length;
    
    if (checked && topMembersCount >= 10) {
      toast({
        title: "Limit Reached",
        description: "You can only select up to 10 top members.",
        variant: "destructive"
      });
      return;
    }
    
    setMemberRankings(prevRankings => 
      prevRankings.map(r => r.id === memberId ? { ...r, isTop: checked, rank: checked ? r.rank : undefined } : r)
    );
  };
  
  const handleRankChange = (memberId: string, rank: string) => {
      const rankNumber = parseInt(rank, 10);
      setMemberRankings(prevRankings => 
        prevRankings.map(r => r.id === memberId ? { ...r, rank: rankNumber } : r)
      );
  };

  const handleEditClick = (member: Member) => {
    router.push(`/admin/members/edit/${member.id}`);
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      setMembers(members.filter(m => m.id !== memberToDelete.id));
      setMemberRankings(memberRankings.filter(r => r.id !== memberToDelete.id));
      setMemberToDelete(null);
      setShowDeleteDialog(false);
    }
  };
  
  const getRankingForMember = (memberId: string) => {
      return memberRankings.find(r => r.id === memberId);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Member Management</h1>
            <p className="text-muted-foreground mt-2">View, edit, and manage all PCMEA members.</p>
        </div>
        <Link href="/admin/members/new">
            <Button>
                <PlusCircle className="mr-2" />
                Add New Member
            </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by member or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full max-w-sm"
        />
      </div>

       <Card className="shadow-sm">
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Top Member</TableHead>
                        <TableHead>Rank</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMembers.map((member) => {
                        const ranking = getRankingForMember(member.id);
                        return (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{member.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{member.company}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        id={`top-member-${member.id}`}
                                        checked={ranking?.isTop}
                                        onCheckedChange={(checked) => handleTopMemberChange(member.id, !!checked)}
                                        aria-label="Select as top member"
                                    />
                                </TableCell>
                                <TableCell>
                                     <Select 
                                        onValueChange={(value) => handleRankChange(member.id, value)}
                                        disabled={!ranking?.isTop}
                                        value={ranking?.rank?.toString()}
                                    >
                                        <SelectTrigger id={`rank-${member.id}`} className="w-[80px]">
                                            <SelectValue placeholder="-" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
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
                                            <DropdownMenuItem onSelect={() => handleEditClick(member)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleDeleteClick(member)} className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                     {filteredMembers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                No members found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the member "{memberToDelete?.name}" from the directory.
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
