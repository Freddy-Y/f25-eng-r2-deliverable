// import { Icons } from "@/components/icons";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Form } from "@/components/ui/form";
// import { useForm } from "react-hook-form";


// export default function EditSpeciesDialog() {
//   const form = useForm<FormData>({
//     resolver: zodResolver(speciesSchema),
//     defaultValues,
//     mode: "onChange",
//   });
  

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="secondary">
//           <Icons.add className="mr-3 h-5 w-5" />
//           Save Changes
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Species Detailed View</DialogTitle>
//           <DialogDescription>
//             Edit species information here. Click &quot;Save Changes&quot; below when you&apos;re done.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>
//             <div className="grid w-full items-center gap-4">
//               <FormField
//                 control={form.control}
//                 name="scientific_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Scientific Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Cavia porcellus" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="common_name"
//                 render={({ field }) => {
//                   // We must extract value from field and convert a potential defaultValue of `null` to "" because inputs can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Common Name</FormLabel>
//                       <FormControl>
//                         <Input value={value ?? ""} placeholder="Guinea pig" {...rest} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <FormField
//                 control={form.control}
//                 name="kingdom"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Kingdom</FormLabel>
//                     <Select onValueChange={(value) => field.onChange(kingdoms.parse(value))} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a kingdom" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectGroup>
//                           {kingdoms.options.map((kingdom, index) => (
//                             <SelectItem key={index} value={kingdom}>
//                               {kingdom}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="total_population"
//                 render={({ field }) => {
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Total population</FormLabel>
//                       <FormControl>
//                         {/* Using shadcn/ui form with number: https://github.com/shadcn-ui/ui/issues/421 */}
//                         <Input
//                           type="number"
//                           value={value ?? ""}
//                           placeholder="300000"
//                           {...rest}
//                           onChange={(event) => field.onChange(+event.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => {
//                   // We must extract value from field and convert a potential defaultValue of `null` to "" because inputs can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Image URL</FormLabel>
//                       <FormControl>
//                         <Input
//                           value={value ?? ""}
//                           placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/George_the_amazing_guinea_pig.jpg/440px-George_the_amazing_guinea_pig.jpg"
//                           {...rest}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => {
//                   // We must extract value from field and convert a potential defaultValue of `null` to "" because textareas can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           value={value ?? ""}
//                           placeholder="The guinea pig or domestic guinea pig, also known as the cavy or domestic cavy, is a species of rodent belonging to the genus Cavia in the family Caviidae."
//                           {...rest}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <div className="flex">
//                 <Button type="submit" className="ml-1 mr-1 flex-auto">
//                   Add Species
//                 </Button>
//                 <DialogClose asChild>
//                   <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
