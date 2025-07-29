"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import useGetKategori from "./hook/useGetKategori";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/libs/axios";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const AddCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("Nama kategori wajib diisi"),
  label: z.string().nonempty("Label harus berupa string"),
});

const DashboardKategoriFeature = () => {
  const form = useForm({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: {
      name: "",
      label: "",
    },
  });
  const { data, isLoading } = useGetKategori();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const res = await axiosInstanceToken.post("/v1/api/kategori", values);
      return res.data;
    },
    onSuccess: (value) => {
      toast.success(value.message);
      queryClient.invalidateQueries({ queryKey: ["kategori"] });
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  return (
    <main className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Kategori</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="cursor-pointer">
              <Plus /> Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Kategori</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => mutate(values))}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Kategori" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Kategori */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Partisipan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell className="pl-8">
                  {item.participants?.length}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </main>
  );
};

export default DashboardKategoriFeature;
